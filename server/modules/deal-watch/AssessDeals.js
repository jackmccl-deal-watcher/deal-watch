const { getRecentlySoldListings } = require("../../utils/ebay/EbayScraper")
const fetchGeminiResponse = require("../../utils/gemini/GeminiUtils")
const { removeIntraPriceOutliers } = require("../parts/EvaluatePartUtils")
const getPCListings = require("./FindPCListings")
const LISTING_PROPERTIES = require("./ListingPropertiesEnum")
const { makeListingPrompt } = require("./Prompt")

const NUM_DEALS_TO_ASSESS = 5
const MIN_NUM_DEFINED_COMPONENT_MODELS = 3
const MIN_LISTINGS_TO_EVALUATE = 4
const DAY_LIMIT = 30
const LISTING_LIMIT = 30
const LOGGING = false

// Takes a listing, passes it to an LLM, 
const extractComponentsFromListing = async (listing) => {
    const prompt = await makeListingPrompt(listing)
    const componentsDictString = await fetchGeminiResponse(prompt)
    const componentsDict = JSON.parse(componentsDictString)
    const listingDict = {
        [LISTING_PROPERTIES.TITLE]: listing[LISTING_PROPERTIES.TITLE],
        [LISTING_PROPERTIES.DESCRIPTION]: listing[LISTING_PROPERTIES.SHORT_DESCRIPTION],
        [LISTING_PROPERTIES.PRICE]: listing[LISTING_PROPERTIES.PRICE][LISTING_PROPERTIES.VALUE],
        [LISTING_PROPERTIES.WEB_URL]: listing[LISTING_PROPERTIES.WEB_URL],
        [LISTING_PROPERTIES.COMPONENTS_DICT]: componentsDict,
    }
    return listingDict
}

const estimateComponentValue = async (component_info) => {
    const recentlySoldListings = await getRecentlySoldListings(component_info, DAY_LIMIT, LISTING_LIMIT, LOGGING)
    const recentlySoldListingsOutliersRemoved = removeIntraPriceOutliers(recentlySoldListings)
    if (recentlySoldListingsOutliersRemoved.length < MIN_LISTINGS_TO_EVALUATE) {
        return 0
    } else {
        return (recentlySoldListingsOutliersRemoved.reduce( (accumulator, listing) => {
            return accumulator + listing[LISTING_PROPERTIES.PRICE][LISTING_PROPERTIES.VALUE]
        }) / recentlySoldListingsOutliersRemoved.length)
    }
}

const assessListing = async (listing) => {
    const listing_listed_value = listing[LISTING_PROPERTIES.PRICE][LISTING_PROPERTIES.VALUE]
    const listing_estimate_value = Object.values(listing[LISTING_PROPERTIES.COMPONENTS_DICT]).reduce( async (accumulator, component_info) => {
        if (!component_info) {
            return accumulator + 0
        } else {
            return accumulator + await estimateComponentValue(component_info)
        }
    }, 0)
    return {...listing, [LISTING_PROPERTIES.DEAL]: listing_estimate_value > listing_listed_value}
}

const assessDeals = async () => {
    const PCListings = await getPCListings()
    let assessedPCListings = []
    const mostRecentPCListings = PCListings.slice(0, NUM_DEALS_TO_ASSESS)
    for (const listing of mostRecentPCListings) {
        try {
            const listingDict = await extractComponentsFromListing(listing)
            if (listingDict[LISTING_PROPERTIES.COMPONENTS_DICT][LISTING_PROPERTIES.NUM_DEFINED] >= MIN_NUM_DEFINED_COMPONENT_MODELS) {
                const assessedPCListing = await assessListing(listingDict)
                assessedPCListings.push(assessedPCListing)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return assessedPCListings
}

assessDeals()
module.exports = assessDeals