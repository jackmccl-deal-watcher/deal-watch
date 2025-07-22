const fetchGeminiResponse = require("../../utils/gemini/GeminiUtils")
const getPCListings = require("./FindPCListings")
const { makeListingPrompt } = require("./Prompt")

const NUM_DEALS_TO_ASSESS = 5
const MIN_NUM_DEFINED_COMPONENT_MODELS = 3

// Takes a listing, passes it to an LLM, 
const assessListing = async (listing) => {
    const prompt = await makeListingPrompt(listing)
    const componentsDictString = await fetchGeminiResponse(prompt)
    const componentsDict = JSON.parse(componentsDictString)
    const listingDict = {
        listing_title: listing.title,
        listing_description: listing.shortDescription,
        listing_price: listing.price.value,
        listing_url: listing.itemWebUrl,
        components_dict: componentsDict,
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
            console.log(listingDict)
            if (listingDict.components_dict.num_defined >= MIN_NUM_DEFINED_COMPONENT_MODELS) {
                assessedPCListings.push(listingDict)
            }
        } catch (error) {
            console.error(error)
        }
    }
    console.log(assessedPCListings)
}

assessDeals()

module.exports = assessDeals