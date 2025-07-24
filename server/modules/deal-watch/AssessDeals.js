const { getRecentlySoldListings } = require("../../utils/ebay/EbayScraper")
const fetchGeminiResponse = require("../../utils/gemini/GeminiUtils")
const VARIABLE_TYPES = require("../../utils/VariableTypesEnum")
const { removeIntraPriceOutliers } = require("../parts/EvaluatePartUtils")
const COMPONENT_VALUE_WEIGHTS = require("./ComponentValueWeights")
const getPCListings = require("./FindPCListings")
const LISTING_PROPERTIES = require("./ListingPropertiesEnum")
const { makeListingPrompt } = require("./Prompt")

const NUM_DEALS_TO_ASSESS = 5
const MIN_NUM_DEFINED_COMPONENT_MODELS = 3
const MIN_LISTINGS_TO_EVALUATE = 4
const DAY_LIMIT = 30
const LISTING_LIMIT = 30
const LOGGING = false

const extractComponentsFromListing = async (listing) => {
    const prompt = await makeListingPrompt(listing)
    const componentsDictString = await fetchGeminiResponse(prompt)
    const componentsDict = JSON.parse(componentsDictString)
    const listingDict = {
        [LISTING_PROPERTIES.TITLE]: listing[LISTING_PROPERTIES.TITLE],
        [LISTING_PROPERTIES.DESCRIPTION]: listing[LISTING_PROPERTIES.SHORT_DESCRIPTION],
        [LISTING_PROPERTIES.PRICE]: Number(listing[LISTING_PROPERTIES.PRICE][LISTING_PROPERTIES.VALUE]),
        [LISTING_PROPERTIES.WEB_URL]: listing[LISTING_PROPERTIES.WEB_URL],
        [LISTING_PROPERTIES.ITEM_URL]: listing[LISTING_PROPERTIES.ITEM_URL],
        [LISTING_PROPERTIES.ITEM_URL]: listing[LISTING_PROPERTIES.ITEM_URL],
        [LISTING_PROPERTIES.COMPONENTS_DICT]: componentsDict,
    }
    return listingDict
}

const estimateComponentValue = async (component_info) => {
    const componentValue = await (Array.isArray(component_info) ? component_info : [component_info]).reduce( async (accumulator_promise, singular_component_info) => {
        const accumulator = await accumulator_promise
        const recentlySoldListings = await getRecentlySoldListings(singular_component_info, DAY_LIMIT, LISTING_LIMIT, LOGGING)
        if (recentlySoldListings.length < MIN_LISTINGS_TO_EVALUATE) {
            return accumulator
        }
        const recentlySoldListingsOutliersRemoved = removeIntraPriceOutliers(recentlySoldListings)
        if (recentlySoldListingsOutliersRemoved.length < MIN_LISTINGS_TO_EVALUATE) {
            return accumulator
        } else {
            const listingAverageValue = (recentlySoldListingsOutliersRemoved.reduce( (accumulator, listing) => {
                return accumulator + listing[LISTING_PROPERTIES.SOLD_PRICE]
            }, 0) / recentlySoldListingsOutliersRemoved.length)
            return accumulator + listingAverageValue
        }
    }, 0)
    return componentValue
}

const assessListing = async (listing) => {
    const listingListedValue = listing[LISTING_PROPERTIES.PRICE]
    let definedComponentsCombinedWeight = 0
    const listingEstimatedValue = await Object.entries(listing[LISTING_PROPERTIES.COMPONENTS_DICT]).reduce( async (accumulator_promise, [component_type, component_info]) => {
        const accumulator = await accumulator_promise
        if (!component_info || typeof component_info === VARIABLE_TYPES.NUMBER) {
            return accumulator
        } else {
            const estimatedComponentValue = await estimateComponentValue(component_info)
            if (estimatedComponentValue > 0) {
                definedComponentsCombinedWeight += COMPONENT_VALUE_WEIGHTS[component_type]
                listing[LISTING_PROPERTIES.COMPONENTS_DICT][component_type] = {
                    [LISTING_PROPERTIES.MODEL]: component_info,
                    [LISTING_PROPERTIES.ESTIMATED_VALUE]: estimatedComponentValue
                }
            } else {
                listing[LISTING_PROPERTIES.COMPONENTS_DICT][component_type] = null
            }
            return accumulator + estimatedComponentValue
        }
    }, 0)
    const definedComponentsValue = listingListedValue*definedComponentsCombinedWeight
    return {...listing, [LISTING_PROPERTIES.DEFINED_VALUE]: definedComponentsValue, [LISTING_PROPERTIES.ASSESSED_VALUE]: Math.round(listingEstimatedValue * 100) / 100, [LISTING_PROPERTIES.DEAL]: listingEstimatedValue > definedComponentsValue}
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

module.exports = assessDeals