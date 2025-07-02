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

const evaluateComparablePart = async (part) => {
    const PAGE_LIMIT = 5
    const recentlySoldListings = await getRecentlySoldListings(part.model, PAGE_LIMIT)
    const recentlySoldListingsOutliersRemoved = removePriceOutliers(recentlySoldListings)
    console.log(recentlySoldListingsOutliersRemoved)



    if (recentlySoldListings.length < 10) {
        return false
    }




}

const evaluatePart = async (part) => {
    const comparableParts = await getComparableParts(part)
    const comparablePartsWithComparabilityScores = getComparabilityScores(comparableParts, part)

    const evaluatedComparablePartsPromises = [comparablePartsWithComparabilityScores[0]].map( async (comparable_part) => {
        const evaluated_comparable_part = await evaluateComparablePart(comparable_part)
        if (evaluated_comparable_part) {

        }
    })

    const resolvedEvaluatedComparablePartsPromises = await Promise.all(evaluatedComparablePartsPromises)




    // Combine trend analysis results from evaluateComparableParts into trend prediction for input part

}

evaluatePart(test_cpu)

module.exports = { evaluatePart }