const { test_cpu } = require('../../tests/parts/test_parts.js')
const { getRecentlySoldListings } = require('../ebay/EbayScraper.js')
const { getComparabilityScores } = require('./ComparabilityScores.js')
const { getComparableParts } = require('./ComparableParts.js')

const calcQuartileInfo = (listings) => {
    const listingsSortedByPrice = listings.sort((a, b) => {
        return a.sold_price - b.sold_price
    })
    const lower_quartile_index = Math.floor(listingsSortedByPrice.length * 0.25)
    const upper_quartile_index = Math.floor(listingsSortedByPrice.length * 0.75)
    const lower_quartile_price = listingsSortedByPrice[lower_quartile_index].sold_price
    const upper_quartile_price = listingsSortedByPrice[upper_quartile_index].sold_price
    const interquartile_range = upper_quartile_price - lower_quartile_price

    return {
        lower_quartile_price,
        upper_quartile_price,
        interquartile_range
    }
}

const removeIntraPriceOutliers = (listings) => {
    const listingsSortedByPrice = listings.sort((a, b) => {
        return a.sold_price - b.sold_price
    })

    const { lower_quartile_price, upper_quartile_price, interquartile_range } = calcQuartileInfo(listingsSortedByPrice)

    const listingsOutliersRemoved = listingsSortedByPrice.filter((listing) => {
        return !(listing.sold_price > upper_quartile_price + 1.5 * interquartile_range || listing.sold_price < lower_quartile_price - 1.5 * interquartile_range)
    })

    return listingsOutliersRemoved
}

const removeInterPriceOutliers = (comparable_parts) => {
    let listings = []
    comparable_parts.map( (comparable_part) => {
        comparable_part.listing_data.map( (listing) => {
            listings.push(listing)
        })
    })
    
    const listingsSortedByPrice = listings.sort((a, b) => {
        return a.sold_price - b.sold_price
    })

    const { lower_quartile_price, upper_quartile_price, interquartile_range } = calcQuartileInfo(listingsSortedByPrice)

    const comparablePartsOutlierListingsRemoved = comparable_parts.map( (comparable_part) => {
        let copy_comparable_part = comparable_part
        const listingsOutliersRemoved = comparable_part.listing_data.filter( (listing) => {
            return !(listing.sold_price > upper_quartile_price + 1.5 * interquartile_range || listing.sold_price < lower_quartile_price - 1.5 * interquartile_range)
        })
        copy_comparable_part.listing_data = listingsOutliersRemoved
        return copy_comparable_part
    })

    return comparablePartsOutlierListingsRemoved
}

const getListingData = async (part) => {
    const PAGE_LIMIT = 5
    const recentlySoldListings = await getRecentlySoldListings(part.model, PAGE_LIMIT)
    if (recentlySoldListings.length === 0) {
        return []
    }
    const recentlySoldListingsOutliersRemoved = removeIntraPriceOutliers(recentlySoldListings)

    const listingData = recentlySoldListingsOutliersRemoved.map( (listing) => {
        const titleRemovedListing = {
            "sold_date": listing.sold_date,
            "sold_price": listing.sold_price,
            "avg_comparability_score": part.average_comparability_score,
        }
        return titleRemovedListing
    })
    // Newest to oldest
    const sortedByDateListingData = listingData.sort( (a, b) => {
        return b.sold_date-a.sold_date
    })
    return sortedByDateListingData
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

const evaluatePart = async (part) => {
    const MINIMUM_LISTINGS = 10
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

        const comparablePartsWithListingData = (await Promise.all(comparablePartsWithListingDataPromises)).filter(value => value !== undefined)

        const comparablePartsWithInterPartListingOutliersRemoved = removeInterPriceOutliers(comparablePartsWithListingData)

        const comparablePartsFewListingsRemoved = comparablePartsWithInterPartListingOutliersRemoved.filter( (comparable_part) => {
            return comparable_part.listing_data.length >= MINIMUM_LISTINGS
        })

        const mostComparableParts = grabNMostComparableParts(comparablePartsFewListingsRemoved, 10)
        
        const evaluation = {
            'comparable_parts': mostComparableParts
        }

        return evaluation
    } catch (error) {
        console.log(error)
    }
}

module.exports = { evaluatePart, removeIntraPriceOutliers, removeInterPriceOutliers }
