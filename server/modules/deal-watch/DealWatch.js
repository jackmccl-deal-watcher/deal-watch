const DealModel = require("../../models/DealModel")
const { getEbayItem } = require("../../utils/ebay/EbayUtils")
const assessDeals = require("./AssessDeals")
const getPCListings = require("./FindPCListings")
const LISTING_PROPERTIES = require("./ListingPropertiesEnum")

const NUM_DEALS_TO_ASSESS_AT_A_TIME = 5

const isSold = async (listing) => {
    const itemInfo = await getEbayItem(listing[LISTING_PROPERTIES.ITEM_URL])
    if (itemInfo?.itemEndDate && new Date(itemInfo?.itemEndDate) < Date.now()) {
        return true
    } else {
        return false
    }
}

const removeSoldListings = async () => {
    let num_sold = 0
    const listings = await DealModel.find({})
    listings.forEach( async (listing) => {
        if (await isSold(listing)) {
            await DealModel.deleteOne({id: listing.id})
            num_sold += 1
        }
    })
    return num_sold
}

const removeDuplicateListings = async (newListings) => {
    const oldListings = await DealModel.find({})
    const oldListingData = {}
    oldListings.forEach( (listing) => {
        oldListingData[listing[LISTING_PROPERTIES.ITEM_ID]] = {}
        oldListingData[listing[LISTING_PROPERTIES.ITEM_ID]][LISTING_PROPERTIES.PRICE] = listing[LISTING_PROPERTIES.PRICE]
    })
    return newListings.filter( (newListing) => {
        return !(oldListingData?.[newListing[LISTING_PROPERTIES.ITEM_ID]]?.[LISTING_PROPERTIES.PRICE] === Number(newListing[LISTING_PROPERTIES.PRICE][LISTING_PROPERTIES.VALUE]))
    })
}

const runDealWatch = async () => {
    const startTime = Date.now()
    console.log(`Starting deal watch scan at ${(new Date()).toISOString()}`)
    const newListings = await getPCListings()
    const newListingsDuplicatesRemoved = await removeDuplicateListings(newListings)
    let numDefinedDeals = 0
    let numDealsAssessed = Math.min(newListingsDuplicatesRemoved.length, NUM_DEALS_TO_ASSESS_AT_A_TIME)
    if (!(newListingsDuplicatesRemoved.length)) {
        console.log("No new non-duplicate listings to assess!")
    } else {
        const newListingsToAssess = newListingsDuplicatesRemoved.slice(0, numDealsAssessed)
        numDefinedDeals = await assessDeals(newListingsToAssess)
    }
    const numSoldListings = await removeSoldListings()
    const endTime = Date.now()
    console.log(`PC Listings Fetched: ${newListings.length}`)
    console.log(`PC Listings After Duplicates Removed: ${newListingsDuplicatesRemoved.length}`)
    console.log(`# of defined deals/# of deals assessed: ${numDefinedDeals}/${numDealsAssessed}`)
    console.log(`Sold listings removed: ${numSoldListings}`)
    console.log(`Time elapsed: ${(endTime - startTime) / 1000} seconds`)
}

module.exports = runDealWatch