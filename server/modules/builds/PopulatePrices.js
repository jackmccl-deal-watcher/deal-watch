const CPUModel = require('../../models/part_models/CPUModel.js')
const VideoCardModel = require('../../models/part_models/VideoCardModel.js')
const MotherboardModel = require('../../models/part_models/MotherboardModel.js')
const MemoryModel = require('../../models/part_models/MemoryModel.js')
const HardDriveModel = require('../../models/part_models/HardDriveModel.js')
const PowerSupplyModel = require('../../models/part_models/PowerSupplyModel.js')
const CaseModel = require('../../models/part_models/CaseModel.js')
const { getRecentlySoldListings } = require('../../utils/ebay/EbayScraper.js')
const { removeIntraPriceOutliers } = require('../parts/EvaluatePart.js')

const MODELS = [CPUModel, VideoCardModel, MotherboardModel, MemoryModel, HardDriveModel, PowerSupplyModel, CaseModel]

const LISTING_DAY_AGE_LIMIT = 30
const MAX_LISTING_LIMIT = 100

const populatePrices = async (models, prev_listing_limit) => {
    for(let model of models) {
        console.log(`Populating ${model.collection.collectionName}`)
        let part_count = 0
        let total_listing_count = 0
        const parts = await model.find()
        for (let part of parts) {
            if(part.thirtyDayTime !== 0) {
                continue
            }
            if (!(part.thirtyDayListingCount >= prev_listing_limit)) {
                continue
            }
            part_count += 1
            const keyword = part.brand + ' ' + part.model
            const listingData = await getRecentlySoldListings(keyword, LISTING_DAY_AGE_LIMIT, MAX_LISTING_LIMIT)
            if (listingData.length < 4) {
                part.thirtyDayAverage = -1
                part.thirtyDayTime = new Date().getTime()
                part.thirtyDayListingCount = listingData.length
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
            let thirtyDayAverage = 0
            if (listingDataPriceOutliersRemoved.length > 0) {
                thirtyDayAverage = Math.round(price_sum / price_count * 100) / 100
            }
            part.thirtyDayAverage = thirtyDayAverage
            part.thirtyDayTime = new Date().getTime()
            part.thirtyDayListingCount = listingDataPriceOutliersRemoved.length
            await part.save()
            total_listing_count += listingDataPriceOutliersRemoved.length
        }
        console.log(`Finished populating ${model.collection.collectionName} with ${part_count} parts and ${total_listing_count} listings`)
    }
}

populatePrices(MODELS, 0)