const mongoose = require('../../Mongoose.js')

const HardDriveSchema = new mongoose.Schema({
    type: String,
    model: String,
    brand: String,
    capacity: Number,
    price_per_gb: Number,
    storage_type: String,
    form_factor: String,
    interface: String,
    thirty_day_average: Number,
    thirty_day_time: Number,
    thirty_day_listing_count: Number,
    pcpp_price: Number,
})

const HardDriveModel = mongoose.model('HardDrive', HardDriveSchema, 'hard-drive')

module.exports = HardDriveModel