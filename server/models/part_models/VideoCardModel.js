const mongoose = require('../../Mongoose.js')

const VideoCardSchema = new mongoose.Schema({
    type: String,
    model: String,
    brand: String,
    cores: Number,
    base_clock: Number,
    boost_clock: Number,
    integrated_graphics: Boolean,
    multithreading: Boolean,
})

const VideoCardModel = mongoose.model('VideoCard', VideoCardSchema, 'video-card')

module.exports = VideoCardModel