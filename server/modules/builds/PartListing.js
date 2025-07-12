const { getListings } = require("../../utils/ebay/EbayUtils")

const LISTING_LIMIT = 100

const getPriceRange = (part) => {
    let price = 0
    if (part['thirtyDayAverage'] > 0) {
        price = part['thirtyDayAverage']
    } else {
        price = part['pcppPrice']
    }
    return { priceRangeLow: (price - price * 0.1), priceRangeHigh: (price + price * 0.1) }
}

const getPartListing = async (part) => {
    const keyword = encodeURI(`${part.brand} ${part.model}`)
    const listingsData = await getListings(keyword, LISTING_LIMIT)
    if (!(listingsData?.itemSummaries?.length)) {
        return false
    }
    const listingSummaries = listingsData['itemSummaries']
    const { priceRangeLow, priceRangeHigh } = getPriceRange(part)
    const priceFilteredListings = listingSummaries.filter((listing) => {
        return (listing.price.value >= priceRangeLow) && (listing.price.value <= priceRangeHigh && (listing.buyingOptions.includes('FIXED_PRICE')))
    })
    if (priceFilteredListings.length === 0) {
        return false
    }
    const sortedListingSummaries = priceFilteredListings.sort((a, b) => a.price.value - b.price.value)
    return sortedListingSummaries[0]
}

const addPartListingsToBuild = async (build) => {
    const buildWithPartListings = JSON.parse(JSON.stringify(build))
    for (let part of Object.values(buildWithPartListings)) {
        const listing = await getPartListing(part)
        if (listing) {
            part['listing_info'] = { status: 'has_listing', listing: listing}
        } else {
            part['listing_info'] = { status: 'no_listing' }
        }
    }
    return buildWithPartListings
}

module.exports = { addPartListingsToBuild }