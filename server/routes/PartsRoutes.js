const express = require('express')
const { getListings } = require('../utils/ebay/EbayUtils')
const { evaluatePart } = require('../utils/parts/EvaluateParts')

const router = express.Router()

router.get('/get_listings', async (req, res, next) => {
    try {
        const { keyword, limit } = req.query
        const listings = await getListings(keyword, limit)
        res.status(200).json(listings)
    } catch (error) {
        next(error)
    }
})

router.post('/evaluate_part', async (req, res, next) => {
    try {
        const part = req.body
        const evaluation = await evaluatePart(part)
        res.status(200).json(evaluation)
    } catch (error) {
        next(error)
    }
})

module.exports = router