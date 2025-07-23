const mongoose = require('../../Mongoose.js')
const RecentlySoldListingSchema = require('./RecentlySoldListing.js')

const MemorySchema = new mongoose.Schema({
    type: String,
    model: String,
    brand: String,
    module_type: String,
    speed: Number,
    number_of_modules: Number,
    module_size: Number,
    total_size: Number,
    first_word_latency: Number,
    cas_timing: Number,
    price_per_gb: Number,
    thirty_day_average: Number,
    thirty_day_time: Number,
    thirty_day_listing_count: Number,
    pcpp_price: Number,
    recently_sold_listings: [RecentlySoldListingSchema],
    recently_sold_listings_date: Date,
})

const MemoryModel = mongoose.model('Memory', MemorySchema, 'memory')

module.exports = MemoryModel