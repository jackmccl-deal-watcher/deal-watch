const { test_cpu } = require('../../tests/parts/test_parts.js')
const { getListings } = require('../ebay/EbayUtils.js')
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


const evaluateComparablePart = async (part) => {
    const listings = getListings(part.model, 10)

    // Insert analysis of listing prices to find trends

}

const evaluatePart = async (part) => {
    const comparableParts = await getComparableParts(part)

    const NUM_COMPARABLES = 10

    const randomComparablePartsSample = grabNRandomItems(comparableParts, NUM_COMPARABLES)


    // Combine trend analysis results from evaluateComparableParts into trend prediction for input part

}

evaluatePart(test_cpu)

module.exports = { evaluatePart }