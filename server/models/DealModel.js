const mongoose = require('../Mongoose.js')
const ComponentTypes = require('../models/part_models/ComponentTypesEnum.js')
const LISTING_PROPERTIES = require('../modules/deal-watch/ListingPropertiesEnum.js')

const componentInfoSchema = new mongoose.Schema({
    [LISTING_PROPERTIES.MODEL]: String,
    [LISTING_PROPERTIES.ESTIMATED_VALUE]: Number,
})

const DealSchema = new mongoose.Schema({
    [LISTING_PROPERTIES.TITLE]: String,
    [LISTING_PROPERTIES.DESCRIPTION]: String,
    [LISTING_PROPERTIES.PRICE]: Number,
    [LISTING_PROPERTIES.WEB_URL]: String,
    [LISTING_PROPERTIES.ITEM_URL]: String,
    [LISTING_PROPERTIES.COMPONENTS_DICT]: {
        type: Object,
        properties: {
            [LISTING_PROPERTIES.NUM_DEFINED]: Number,
            [ComponentTypes.CPU]: { type: componentInfoSchema, default: null },
            [ComponentTypes.VIDEOCARD]: { type: componentInfoSchema, default: null },
            [ComponentTypes.MOTHERBOARD]: { type: componentInfoSchema, default: null },
            [ComponentTypes.MEMORY]: { type: componentInfoSchema, default: null },
            [ComponentTypes.HARD_DRIVE]: { type: componentInfoSchema, default: null },
            [ComponentTypes.POWER_SUPPLY]: { type: componentInfoSchema, default: null },
            [ComponentTypes.CASE]: { type: componentInfoSchema, default: null },
        },
    },
    [LISTING_PROPERTIES.DEFINED_VALUE]: Number,
    [LISTING_PROPERTIES.ASSESSED_VALUE]: Number,
    [LISTING_PROPERTIES.DEAL]: Boolean,
})

const DealModel = mongoose.model('Deal', DealSchema, 'deals')

module.exports = DealModel