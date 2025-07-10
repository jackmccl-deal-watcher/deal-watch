const { test_cpu } = require("../../tests/test_parts/test_cpu")
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

const getListingLink = async (part) => {
    const keyword = encodeURI(`${part.brand} ${part.model}`)
    const listingsData = await getListings(keyword, LISTING_LIMIT)
    if (listingsData['itemSummaries'].length === 0) {
        return false
    }
    const listingSummaries = listingsData['itemSummaries']
    const { priceRangeLow, priceRangeHigh } = getPriceRange(part)
    const priceFilteredListings = listingSummaries.filter((listing) => {
        return (listing.price.value >= priceRangeLow) && (listing.price.value <= priceRangeHigh && (listing.buyingOptions[0] === 'FIXED_PRICE'))
    })
    if (priceFilteredListings.length === 0) {
        return false
    }
    const sortedListingSummaries = priceFilteredListings.sort((a, b) => a.price.value - b.price.value)
    if (sortedListingSummaries.length === 0) {
        return false
    } else {
        return sortedListingSummaries[0]
    }
}

getListingLink(test_cpu)

module.exports = getListingLink