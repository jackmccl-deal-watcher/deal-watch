const mongoose = require('../../Mongoose.js')

const MotherboardSchema = new mongoose.Schema({
    type: String,
    model: String,
    brand: String,
    socket: String,
    form_factor: String,
    ram_slots: Number,
    max_ram: Number,
    thirty_day_average: Number,
    thirty_day_time: Number,
    thirty_day_listing_count: Number,
    pcpp_price: Number,
})

const MotherboardModel = mongoose.model('Motherboard', MotherboardSchema, 'motherboard')

module.exports = MotherboardModel