const { MODELS } = require('./BuildConstants.js')
const { removeIntraPriceOutliers } = require('../parts/EvaluatePartUtils.js')

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000

const updatePrices = async (partDocument, listingData) => {
    const thirtyDaysListingData = listingData.filter( (listing) => new Date(listing.sold_date).getTime() >= new Date().getTime() - THIRTY_DAYS_IN_MS)
    if (thirtyDaysListingData.length < 4) {
        partDocument.thirty_day_average = -1
        partDocument.thirty_day_time = new Date().getTime()
        partDocument.thirty_day_listing_count = listingData.length
        await partDocument.save()
    }
    const listingDataPriceOutliersRemoved = removeIntraPriceOutliers(listingData)
    let price_sum = 0
    let price_count = 0
    listingDataPriceOutliersRemoved.forEach( (listing) => {
        price_sum += listing.sold_price
        price_count += 1
    })
    let thirty_day_average = 0
    if (listingDataPriceOutliersRemoved.length > 0) {
        thirty_day_average = Math.round(price_sum / price_count * 100) / 100
    }
    partDocument.thirty_day_average = thirty_day_average
    partDocument.thirty_day_time = new Date().getTime()
    partDocument.thirty_day_listing_count = listingDataPriceOutliersRemoved.length
    await partDocument.save()
    return listingDataPriceOutliersRemoved.length
}

const populatePrices = async (models, prev_listing_limit) => {
    for(let model of models) {
        console.log(`Populating ${model.collection.collectionName}`)
        let part_count = 0
        let total_listing_count = 0
        const parts = await model.find()
        for (let part of parts) {
            if (!(part.thirty_day_listing_count >= prev_listing_limit)) {
                continue
            }
            part_count += 1
            const listingData = await handleListings(part)
            const listingDataOutliersRemovedLength = await updatePrices(part, listingData)
            total_listing_count += listingDataOutliersRemovedLength
        }
        console.log(`Finished populating ${model.collection.collectionName} with ${part_count} parts and ${total_listing_count} listings`)
    }
}

module.exports = updatePrices