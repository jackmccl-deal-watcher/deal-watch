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
    thirtyDayAverage: Number,
    thirtyDayTime: Number,
    thirtyDayListingCount: Number,
})

const HardDriveModel = mongoose.model('HardDrive', HardDriveSchema, 'hard-drive')

module.exports = HardDriveModel