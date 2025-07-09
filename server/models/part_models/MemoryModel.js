const mongoose = require('../../Mongoose.js')

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
    thirtyDayAverage: Number,
    thirtyDayTime: Number,
    thirtyDayListingCount: Number,
})

const MemoryModel = mongoose.model('Memory', MemorySchema, 'memory')

module.exports = MemoryModel