const fetchGeminiResponse = require("../../utils/gemini/GeminiUtils")
const getPCListings = require("./FindPCListings")
const LISTING_PROPERTIES = require("./ListingPropertiesEnum")
const { makeListingPrompt } = require("./Prompt")

const NUM_DEALS_TO_ASSESS = 5
const MIN_NUM_DEFINED_COMPONENT_MODELS = 3

// Takes a listing, passes it to an LLM, 
const assessListing = async (listing) => {
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

const assessDeals = async () => {
    const PCListings = await getPCListings()
    let assessedPCListings = []
    const mostRecentPCListings = PCListings.slice(0, NUM_DEALS_TO_ASSESS)
    for (const listing of mostRecentPCListings) {
        try {
            const listingDict = await assessListing(listing)
            if (listingDict[LISTING_PROPERTIES.COMPONENTS_DICT][LISTING_PROPERTIES.NUM_DEFINED] >= MIN_NUM_DEFINED_COMPONENT_MODELS) {
                assessedPCListings.push(listingDict)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return assessedPCListings
}

module.exports = assessDeals