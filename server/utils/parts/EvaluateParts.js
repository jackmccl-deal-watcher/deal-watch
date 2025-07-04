const { test_cpu } = require('../../tests/parts/test_parts.js')
const { getRecentlySoldListings } = require('../ebay/EbayScraper.js')
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

    const lower_quartile_index = Math.floor(listingsSortedByPrice.length * 0.25)
    const upper_quartile_index = Math.floor(listingsSortedByPrice.length * 0.75)
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
    if (recentlySoldListings.length === 0) {
        return []
    }
    const recentlySoldListingsOutliersRemoved = removePriceOutliers(recentlySoldListings)
    const listingData = recentlySoldListingsOutliersRemoved.map( (listing) => {
        const titleRemovedListing = {
            "sold_date": listing.sold_date,
            "sold_price": listing.sold_price,
        }
        return titleRemovedListing
    })
    // Newest to oldest
    const sortedByDateListingData = listingData.sort( (a, b) => {
        return b.sold_date-a.sold_date
    })
    return listingData
}

const grabNMostComparableParts = (comparable_parts, N) => {
    const sortedComparableParts = comparable_parts.sort((a, b) => {
        return a.average_comparability_score - b.average_comparability_score
    })

    if (sortedComparableParts.length < N) {
        return sortedComparableParts
    } else {
        return sortedComparableParts.slice(0, N)
    }
}

const calcWeightedLineOfBestFit = (comparable_parts) => {
    let sum_prices = 0
    let sum_times = 0
    let num_prices = 0
    let num_times = 0
    comparable_parts.map( (comparable_part) => {
        comparable_part.listing_data.map( (listing) => {
            sum_prices += listing.sold_price * comparable_part.average_comparability_score
            sum_times += listing.sold_date * comparable_part.average_comparability_score
            num_prices += comparable_part.average_comparability_score
            num_times += comparable_part.average_comparability_score
        })
    })
    const weighted_avg_price = sum_prices / num_prices
    const weighted_avg_time = sum_times / num_times

}

const evaluatePart = async (part) => {
    const MINIMUM_LISTINGS = 10
    const NUM_COMPARABLE_PARTS = 10
    try {
        const comparableParts = await getComparableParts(part)
        if (!comparableParts) {
            throw new Error("No comparable parts found!")
        }
        const comparablePartsWithComparabilityScores = getComparabilityScores(comparableParts, part)

        const comparablePartsWithListingDataPromises = comparablePartsWithComparabilityScores.map( async (comparable_part) => {
            let copy_comparable_part = {...comparable_part}
            const listingData = await getListingData(comparable_part)

            if (listingData.length > MINIMUM_LISTINGS) {
                copy_comparable_part["listing_data"] = listingData
                return copy_comparable_part
            }
        })

        if (comparablePartsWithListingDataPromises.length === 0) {
            throw new Error(`No comparable parts with enough listing data!`)
        }

        const comparablePartsWithListingData = await Promise.all(comparablePartsWithListingDataPromises)

        const mostComparableParts = grabNMostComparableParts(comparablePartsWithListingData, NUM_COMPARABLE_PARTS)



    } catch (error) {
        console.log(error)
    }
}

module.exports = { evaluatePart, removePriceOutliers }