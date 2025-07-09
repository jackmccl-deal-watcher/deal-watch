const mongoose = require('../../Mongoose.js')

const MotherboardSchema = new mongoose.Schema({
    type: String,
    model: String,
    brand: String,
    socket: String,
    form_factor: String,
    ram_slots: Number,
    max_ram: Number,
    thirtyDayAverage: Number,
    thirtyDayTime: Number,
    thirtyDayListingCount: Number,
})

const MotherboardModel = mongoose.model('Motherboard', MotherboardSchema, 'motherboard')

module.exports = MotherboardModel