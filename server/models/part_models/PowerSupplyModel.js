const mongoose = require('../../Mongoose.js')

const PowerSupplySchema = new mongoose.Schema({
    type: String,
    model: String,
    brand: String,
    form_factor: String,
    efficiency_rating: String,
    wattage: Number,
    modular: String,
    thirty_day_average: Number,
    thirty_day_time: Number,
    thirty_day_listing_count: Number,
    pcpp_price: Number,
})

const PowerSupplyModel = mongoose.model('PowerSupply', PowerSupplySchema, 'power-supply')

module.exports = PowerSupplyModel