const { PartEvaluationError } = require('../../errors/PartEvaluationError.js')
const { getRecentlySoldListings } = require('../ebay/EbayScraper.js')
const { getComparabilityScores } = require('./ComparabilityScores.js')
const { getComparableParts } = require('./ComparableParts.js')

const MINIMUM_LISTINGS = 10
const LISTING_DAY_AGE_LIMIT = 90
const MAX_LISTING_LIMIT = 500

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
    const { lower_quartile_price, upper_quartile_price, interquartile_range } = calcQuartileInfo(listings)
    const listingsOutliersRemoved = listings.filter((listing) => {
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

    const { lower_quartile_price, upper_quartile_price, interquartile_range } = calcQuartileInfo(listings)
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
    const keyword = part.brand + ' ' + part.model
    const recentlySoldListings = await getRecentlySoldListings(keyword, LISTING_DAY_AGE_LIMIT, MAX_LISTING_LIMIT)
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
    const comparableParts = await getComparableParts(part)
    if (!comparableParts) {
        throw new PartEvaluationError("No comparable parts found!")
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
        throw new PartEvaluationError(`No comparable parts with enough listing data!`)
    }

    const comparablePartsWithListingData = (await Promise.all(comparablePartsWithListingDataPromises)).filter(value => value !== undefined)
    
    const comparablePartsWithInterPartListingOutliersRemoved = removeInterPriceOutliers(comparablePartsWithListingData)
    
    const comparablePartsFewListingsRemoved = comparablePartsWithInterPartListingOutliersRemoved.filter( (comparable_part) => {
        return comparable_part.listing_data.length >= MINIMUM_LISTINGS
    })
    if (comparablePartsFewListingsRemoved.length === 0) {
        throw new PartEvaluationError(`No comparable parts with low enough listing data variation!`)
    }

    const mostComparableParts = grabNMostComparableParts(comparablePartsFewListingsRemoved, 10)
    
    const evaluation = {
        'comparable_parts': mostComparableParts
    }

    return evaluation
}

module.exports = { evaluatePart, removeIntraPriceOutliers, removeInterPriceOutliers }
