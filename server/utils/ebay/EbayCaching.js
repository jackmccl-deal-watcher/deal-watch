const ModelTypesEnum = require("../../models/part_models/ModelTypesEnum")
const { sortBySoldDate } = require("./EbayListingUtils")
const { getRecentlySoldListings } = require("./EbayScraper")

const LISTING_DAY_AGE_LIMIT = 90
const LISTING_MS_AGE_LIMIT = LISTING_DAY_AGE_LIMIT * 24 * 60 * 60 * 1000
const MAX_LISTING_LIMIT = 500
const LOGGING = false
const MS_IN_A_DAY = 24 * 60 * 60 * 1000

const UNCOMMON_STALE_CACHE_TIME_REQUIREMENT = 7 * 24 * 60 * 60 * 1000
const COMMON_STALE_CACHE_TIME_REQUIREMENT = 1 * 24 * 60 * 60 * 1000

const handleListings = async (part) => {
    const model = ModelTypesEnum[part.type]
    const partDocument = await model.findOne({type: part.type, model: part.model, brand: part.brand})
    let cachedListingData = partDocument.recently_sold_listings
    const cachedListingDataDate = partDocument.recently_sold_listings_date
    const keyword = part.brand + ' ' + part.model
    let recentlySoldListings = []
    if (!cachedListingData || cachedListingData.length < 5
        && new Date(cachedListingDataDate) > new Date().getTime() - UNCOMMON_STALE_CACHE_TIME_REQUIREMENT) {
        return cachedListingData || []
    } else if (cachedListingDataDate 
                && new Date(cachedListingDataDate) > new Date().getTime() - COMMON_STALE_CACHE_TIME_REQUIREMENT) {
        return cachedListingData
    }

    if (!(cachedListingData.length)) {
        cachedListingData = []
        recentlySoldListings = await getRecentlySoldListings(keyword, LISTING_DAY_AGE_LIMIT, MAX_LISTING_LIMIT, LOGGING)
    } else {
        const cachedListingDataSortedBySoldDate = sortBySoldDate(cachedListingData)
        const mostRecentCachedSoldDate = cachedListingDataSortedBySoldDate[0].sold_date

        const RELATIVE_LISTING_DAY_AGE_LIMIT = (new Date().getTime() - new Date(mostRecentCachedSoldDate).getTime()) / MS_IN_A_DAY
        recentlySoldListings = await getRecentlySoldListings(keyword, RELATIVE_LISTING_DAY_AGE_LIMIT, MAX_LISTING_LIMIT, LOGGING)
    }

    partDocument.recently_sold_listings_date = new Date()
    await partDocument.save()

    if (!(recentlySoldListings.length)) {
        return cachedListingData
    }

    const allListings = [...cachedListingData, ...recentlySoldListings]

    if (!(allListings.length)) {
        return []
    }

    const allFreshListings = allListings.filter( (listing) => new Date(listing.sold_date).getTime() >= new Date().getTime() - LISTING_MS_AGE_LIMIT)

    const addedTitles = new Set()
    const allFreshListingsNoDuplicates = allFreshListings.filter( (listing) => {
        const alreadyAdded = addedTitles.has(listing.title)
        addedTitles.add(listing.title)
        return !alreadyAdded
    })
    
    partDocument.recently_sold_listings = allFreshListingsNoDuplicates
    await partDocument.save()
    return allFreshListingsNoDuplicates
}

module.exports = { handleListings }