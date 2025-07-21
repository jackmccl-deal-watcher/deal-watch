const mongoose = require('../../Mongoose.js')
const RecentlySoldListingSchema = new mongoose.Schema({
    _id: String,
    title: String,
    sold_date: Date,
    sold_price: Number,
});

module.exports = RecentlySoldListingSchema