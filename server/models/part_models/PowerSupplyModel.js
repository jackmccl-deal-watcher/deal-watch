const mongoose = require('../../Mongoose.js')

const PowerSupplySchema = new mongoose.Schema({
    type: String,
    model: String,
    brand: String,
    form_factor: String,
    efficiency_rating: String,
    wattage: Number,
    modular: String,
    thirtyDayAverage: Number,
    thirtyDayTime: Number,
    thirtyDayListingCount: Number,
    pcppPrice: Number,
})

const PowerSupplyModel = mongoose.model('PowerSupply', PowerSupplySchema, 'power-supply')

module.exports = PowerSupplyModel