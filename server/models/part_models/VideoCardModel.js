const mongoose = require('../../Mongoose.js')

const VideoCardSchema = new mongoose.Schema({
    type: String,
    model: String,
    brand: String,
    base_clock: Number,
    boost_clock: Number,
    vram: Number,
    chipset: String,
    thirtyDayAverage: Number,
    thirtyDayTime: Number,
    thirtyDayListingCount: Number,
    pcppPrice: Number,
})

const VideoCardModel = mongoose.model('VideoCard', VideoCardSchema, 'video-card')

module.exports = VideoCardModel