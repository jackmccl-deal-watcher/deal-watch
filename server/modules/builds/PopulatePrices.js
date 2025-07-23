const { MODELS } = require('./BuildConstants.js')
const { removeIntraPriceOutliers } = require('../parts/EvaluatePartUtils.js')

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000

const MINIMUM_THIRTY_DAY_LISTINGS = 4

const updatePrices = async (partDocument, listingData) => {
    const thirtyDaysListingData = listingData.filter( (listing) => new Date(listing.sold_date).getTime() >= Date.now() - THIRTY_DAYS_IN_MS)
    if (thirtyDaysListingData.length < MINIMUM_THIRTY_DAY_LISTINGS) {
        partDocument.thirty_day_average = -1
        partDocument.thirty_day_time = Date.now()
        partDocument.thirty_day_listing_count = listingData.length
        await partDocument.save()
        return
    }
    const listingDataPriceOutliersRemoved = removeIntraPriceOutliers(listingData)
    const price_sum = listings.reduce((accumulator, listing) => accumulator + listing.sold_price, 0);
    let thirty_day_average = -1
    if (listingDataPriceOutliersRemoved.length > 0) {
        thirty_day_average = Math.round(price_sum / listings.length * 100) / 100
    }
    partDocument.thirty_day_average = thirty_day_average
    partDocument.thirty_day_time = Date.now()
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