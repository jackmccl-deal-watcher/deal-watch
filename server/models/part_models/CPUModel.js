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
    thirtyDayAverage: Number,
    thirtyDayTime: Number,
    thirtyDayListingCount: Number,
})

const CPUModel = mongoose.model('CPU', CPUSchema, 'cpu')

module.exports = CPUModel