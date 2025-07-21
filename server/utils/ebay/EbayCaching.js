const ModelTypesEnum = require("../../models/part_models/ModelTypesEnum")
const { sortBySoldDate } = require("../../modules/parts/EvaluatePart")
const { getRecentlySoldListings } = require("./EbayScraper")

const LISTING_DAY_AGE_LIMIT = 90
const LISTING_MS_AGE_LIMIT = LISTING_DAY_AGE_LIMIT * 24 * 60 * 60 * 1000
const MAX_LISTING_LIMIT = 500
const LOGGING = false
const MS_IN_A_DAY = 24 * 60 * 60 * 1000

const handleListings = async (part) => {
    const model = ModelTypesEnum[part.type]
    const partDocument = await model.find({type: part.type, model: part.model, brand: part.brand})
    let cachedListingData = partDocument.recently_sold_listings
    if (!cachedListingData) {
        cachedListingData = []
    }
    const cachedListingDataSortedBySoldDate = sortBySoldDate(cachedListingData)
    const mostRecentCachedSoldDate = cachedListingDataSortedBySoldDate[0].sold_date

    const keyword = part.brand + ' ' + part.model
    const LISTING_DAY_AGE_LIMIT = ((new Date().getTime() - new Date(mostRecentCachedSoldDate).getTime()) / MS_IN_A_DAY)
    const recentlySoldListings = await getRecentlySoldListings(keyword, LISTING_DAY_AGE_LIMIT, MAX_LISTING_LIMIT, LOGGING)
    if (!recentlySoldListings.length) {
        return cachedListingData
    }

    const recentlySoldListingsSortedBySoldDate = sortBySoldDate(recentlySoldListings)
    const newestRecentListingSoldDate = recentlySoldListingsSortedBySoldDate[0].sold_date

    const allListings = [...cachedListingData, ...recentlySoldListings]

    const allFreshListings = allListings.filter( (listing) => new Date(listing.sold_date).getTime() >= new Date(newestRecentListingSoldDate).getTime() -  LISTING_MS_AGE_LIMIT)

    partDocument.recently_sold_listings = allFreshListings

    await partDocument.save()
    return allFreshListings
}