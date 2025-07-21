const mongoose = require('../../Mongoose.js')
const RecentlySoldListingSchema = require('./RecentlySoldListing.js')

const CaseSchema = new mongoose.Schema({
    type: String,
    model: String,
    brand: String,
    form_factor: String,
    color: String,
    external_bays: Number,
    internal_bays: Number,
    psu_wattage: Number,
    side_panel: String,
    thirty_day_average: Number,
    thirty_day_time: Number,
    thirty_day_listing_count: Number,
    pcpp_price: Number,
    recently_sold_listings: [RecentlySoldListingSchema],
})

const CaseModel = mongoose.model('Case', CaseSchema, 'case')

module.exports = CaseModel