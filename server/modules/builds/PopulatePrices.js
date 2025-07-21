const { MODELS, LISTING_DAY_AGE_LIMIT, MAX_LISTING_LIMIT, LOGGING } = require('./BuildConstants.js')

const populatePrices = async (models, prev_listing_limit) => {
    for(let model of models) {
        console.log(`Populating ${model.collection.collectionName}`)
        let part_count = 0
        let total_listing_count = 0
        const parts = await model.find()
        for (let part of parts) {
            if(part.thirty_day_time !== 0) {
                continue
            }
            if (!(part.thirty_day_listing_count >= prev_listing_limit)) {
                continue
            }
            part_count += 1
            const listingData = await handleListings(part)
            if (listingData.length < 4) {
                part.thirty_day_average = -1
                part.thirty_day_time = new Date().getTime()
                part.thirty_day_listing_count = listingData.length
                await part.save()
                continue
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
            part.thirty_day_average = thirty_day_average
            part.thirty_day_time = new Date().getTime()
            part.thirty_day_listing_count = listingDataPriceOutliersRemoved.length
            await part.save()
            total_listing_count += listingDataPriceOutliersRemoved.length
        }
        console.log(`Finished populating ${model.collection.collectionName} with ${part_count} parts and ${total_listing_count} listings`)
    }
}

populatePrices(MODELS, 0)