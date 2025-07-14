const mongoose = require('../../Mongoose.js')

const VideoCardSchema = new mongoose.Schema({
    type: String,
    model: String,
    brand: String,
    base_clock: Number,
    boost_clock: Number,
    vram: Number,
    chipset: String,
    thirty_day_average: Number,
    thirty_day_time: Number,
    thirty_day_listing_count: Number,
    pcpp_price: Number,
})

const VideoCardModel = mongoose.model('VideoCard', VideoCardSchema, 'video-card')

module.exports = VideoCardModel