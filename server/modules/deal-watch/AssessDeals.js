const DealModel = require("../../models/DealModel")
const { getRecentlySoldListings } = require("../../utils/ebay/EbayScraper")
const fetchGeminiResponse = require("../../utils/gemini/GeminiUtils")
const VARIABLE_TYPES = require("../../utils/VariableTypesEnum")
const { removeIntraPriceOutliers } = require("../parts/EvaluatePartUtils")
const COMPONENT_VALUE_WEIGHTS = require("./ComponentValueWeights")
const getPCListings = require("./FindPCListings")
const LISTING_PROPERTIES = require("./ListingPropertiesEnum")
const { makeListingPrompt } = require("./Prompt")

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
        [LISTING_PROPERTIES.ITEM_ID]: listing[LISTING_PROPERTIES.ITEM_ID],
        [LISTING_PROPERTIES.TITLE]: listing[LISTING_PROPERTIES.TITLE],
        [LISTING_PROPERTIES.DESCRIPTION]: listing[LISTING_PROPERTIES.SHORT_DESCRIPTION],
        [LISTING_PROPERTIES.PRICE]: Number(listing[LISTING_PROPERTIES.PRICE][LISTING_PROPERTIES.VALUE]),
        [LISTING_PROPERTIES.WEB_URL]: listing[LISTING_PROPERTIES.WEB_URL],
        [LISTING_PROPERTIES.ITEM_URL]: listing[LISTING_PROPERTIES.ITEM_URL],
        [LISTING_PROPERTIES.COMPONENTS_DICT]: componentsDict,
    }
    return listingDict
}

const estimateComponentValue = async (component_info) => {
    const recentlySoldListings = await getRecentlySoldListings(component_info, DAY_LIMIT, LISTING_LIMIT, LOGGING)
    if (recentlySoldListings.length < MIN_LISTINGS_TO_EVALUATE) {
        return 0
    }
    const recentlySoldListingsOutliersRemoved = removeIntraPriceOutliers(recentlySoldListings)
    if (recentlySoldListingsOutliersRemoved.length < MIN_LISTINGS_TO_EVALUATE) {
        return 0
    } else {
        const listingAverageValue = (recentlySoldListingsOutliersRemoved.reduce( (accumulator, listing) => {
            return accumulator + listing[LISTING_PROPERTIES.SOLD_PRICE]
        }, 0) / recentlySoldListingsOutliersRemoved.length)
        return listingAverageValue
    }
}

const assessListing = async (listing) => {
    const listingListedValue = listing[LISTING_PROPERTIES.PRICE]
    let definedComponentsCombinedWeight = 0
    const listingEstimatedValue = await Object.entries(listing[LISTING_PROPERTIES.COMPONENTS_DICT]).reduce( async (accumulator_promise, [component_type, component_info]) => {
        const accumulator = await accumulator_promise
        if (component_info === null || component_info === 'null' || !(typeof component_info === VARIABLE_TYPES.STRING || typeof component_info === VARIABLE_TYPES.OBJECT)) {
            listing[LISTING_PROPERTIES.COMPONENTS_DICT][component_type] = null
            return accumulator + 0
        } else {
            const estimatedComponentTypeValue = await (Array.isArray(component_info) ? component_info : [component_info]).reduce( async (accumulator_promise, singular_component_info, index) => {
                const accumulator = await accumulator_promise
                const estimatedComponentValue = await estimateComponentValue(singular_component_info)
                const singularComponentValueDict = {
                        [LISTING_PROPERTIES.MODEL]: singular_component_info,
                        [LISTING_PROPERTIES.ESTIMATED_VALUE]: Math.round(estimatedComponentValue * 100) / 100
                    }
                if (Array.isArray(component_info)) {
                    listing[LISTING_PROPERTIES.COMPONENTS_DICT][component_type][index] = singularComponentValueDict
                } else {
                    listing[LISTING_PROPERTIES.COMPONENTS_DICT][component_type] = singularComponentValueDict
                }
                return accumulator + estimatedComponentValue
            }, 0)
            if (estimatedComponentTypeValue > 0) {
                definedComponentsCombinedWeight += COMPONENT_VALUE_WEIGHTS[component_type]
            } else {
                listing[LISTING_PROPERTIES.COMPONENTS_DICT][component_type] = null
            }
            return accumulator + estimatedComponentTypeValue
        }
    }, 0)
    const definedComponentsValue = listingListedValue*definedComponentsCombinedWeight
    return {...listing, [LISTING_PROPERTIES.DEFINED_VALUE]: Math.round(definedComponentsValue * 100) / 100, [LISTING_PROPERTIES.ASSESSED_VALUE]: Math.round(listingEstimatedValue * 100) / 100, [LISTING_PROPERTIES.DEAL]: listingEstimatedValue > definedComponentsValue}
}

const countNumDefined = (listing) => {
    return Object.values(listing[LISTING_PROPERTIES.COMPONENTS_DICT]).reduce( (accumulator, component_info) => {
        if (!(component_info === null)) {
            return accumulator + 1
        } else {
            return accumulator
        }
    }) 
}

const assessDeals = async (PCListings) => {
    let numDefinedDeals = 0
    for (let listing of PCListings) {
        try {
            listing = await extractComponentsFromListing(listing)
            if (listing[LISTING_PROPERTIES.COMPONENTS_DICT][LISTING_PROPERTIES.NUM_DEFINED] >= MIN_NUM_DEFINED_COMPONENT_MODELS) {
                listing = await assessListing(listing)
                listing[LISTING_PROPERTIES.COMPONENTS_DICT][LISTING_PROPERTIES.NUM_DEFINED] = countNumDefined(listing)
                if (listing[LISTING_PROPERTIES.COMPONENTS_DICT][LISTING_PROPERTIES.NUM_DEFINED] >= MIN_NUM_DEFINED_COMPONENT_MODELS) {
                    numDefinedDeals += 1
                }
            }
            const deal = new DealModel(listing)
            await deal.save()
        } catch (error) {
            console.error(error)
        }
    }
    return numDefinedDeals
}

module.exports = assessDeals