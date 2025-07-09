const mongoose = require('../../Mongoose.js')

const CaseSchema = new mongoose.Schema({
    type: String,
    model: String,
    brand: String,
    form_factor: String,
    color: String,
    external_bays: Number,
    internal_bays: Number,
    psu_wattage: Number,
    side_panel: String,
    thirtyDayAverage: Number,
    thirtyDayTime: Number,
    thirtyDayListingCount: Number,
})

const CaseModel = mongoose.model('Case', CaseSchema, 'case')

module.exports = CaseModel