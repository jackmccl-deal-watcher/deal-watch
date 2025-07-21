const { PartEvaluationError } = require('../../errors/PartEvaluationError.js')
const { handleListings } = require('../../utils/ebay/EbayCaching.js')
const { sortBySoldDate } = require('../../utils/ebay/EbayListingUtils.js')
const { removeIntraPriceOutliers, removeInterPriceOutliers } = require('./EvaluatePartUtils.js')
const { getComparabilityScores } = require('./ComparabilityScores.js')
const { getComparableParts } = require('./ComparableParts.js')

const MINIMUM_LISTINGS = 10

const getListingData = async (part) => {
    const recentlySoldListings = await handleListings(part)
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
    const sortedByDateListingData = sortBySoldDate(listingData)
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

    if (comparablePartsWithListingData.length === 0) {
        throw new PartEvaluationError(`No comparable parts with enough listing data!`)
    }

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

module.exports = { evaluatePart }
