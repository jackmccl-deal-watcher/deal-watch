const mongoose = require('../../Mongoose.js')

const CPUSchema = new mongoose.Schema({
    type: String,
    model: String,
    brand: String,
    cores: Number,
    base_clock: Number,
    boost_clock: Number,
    integrated_graphics: String,
    multithreading: Boolean,
    thirty_day_average: Number,
    thirty_day_time: Number,
    thirty_day_listing_count: Number,
    pcpp_price: Number,
})

const CPUModel = mongoose.model('CPU', CPUSchema, 'cpu')

module.exports = CPUModel