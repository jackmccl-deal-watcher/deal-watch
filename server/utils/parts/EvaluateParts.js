const { test_cpu } = require('../../tests/parts/test_parts.js')
const getRecentlySoldListings = require('../ebay/EbayScraper.js')
const { getComparabilityScores } = require('./ComparabilityScores.js')
const { getComparableParts } = require('./ComparableParts.js')

const grabNRandomItems = (items, N) => {
    let selectedItems = []
    let count = 0
    while (count < N) {
        const index = Math.floor(Math.random() * items.length)
        const randomItem = items[index]
        if (selectedItems && selectedItems.includes(randomItem)) {
            continue
        } else {
            count++;
            selectedItems.push(randomItem)
        }
    }
    return selectedItems
}

const removePriceOutliers = (listings) => {
    const listingsSortedByPrice = listings.sort((a, b) => {
        return a.sold_price - b.sold_price
    })

    const lower_quartile_index = Math.round(listingsSortedByPrice.length * 0.25)
    const upper_quartile_index = Math.round(listingsSortedByPrice.length * 0.75)
    const lower_quartile_price = listingsSortedByPrice[lower_quartile_index].sold_price
    const upper_quartile_price = listingsSortedByPrice[upper_quartile_index].sold_price
    const interquartile_range = upper_quartile_price - lower_quartile_price

    const listingsOutliersRemoved = listingsSortedByPrice.filter((listing) => {
        return !(listing.sold_price > upper_quartile_price + 1.5 * interquartile_range || listing.sold_price < lower_quartile_price - 1.5 * interquartile_range)
    })

    return listingsOutliersRemoved
}

const getListingData = async (part) => {
    const PAGE_LIMIT = 5
    const recentlySoldListings = await getRecentlySoldListings(part.model, PAGE_LIMIT)
    if (!recentlySoldListings || recentlySoldListings.length < 3) {
        return []
    }
    const recentlySoldListingsOutliersRemoved = removePriceOutliers(recentlySoldListings)
    const listing_data = recentlySoldListingsOutliersRemoved.map( (listing) => {
        const titleRemovedListing = {
            "sold_date": listing.sold_date,
            "sold_price": listing.sold_price,
        }
        return titleRemovedListing
    })
    return listing_data
}

const evaluatePart = async (part) => {
    const comparableParts = await getComparableParts(part)
    const comparablePartsWithComparabilityScores = getComparabilityScores(comparableParts, part)

    const comparablePartsWithListingDataPromises = comparablePartsWithComparabilityScores.map( async (comparable_part) => {
        let copy_comparable_part = {...comparable_part}
        copy_comparable_part["listing_data"] = await getListingData(comparable_part)
        return copy_comparable_part
    })

    const comparablePartsWithListingData = await Promise.all(comparablePartsWithListingDataPromises)

    // Combine trend analysis results from evaluateComparableParts into trend prediction for input part

}

evaluatePart(test_cpu)

module.exports = { evaluatePart }