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
})

const HardDriveModel = mongoose.model('HardDrive', HardDriveSchema, 'hard-drive')

module.exports = HardDriveModel