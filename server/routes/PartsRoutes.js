const express = require('express')
const { getListings } = require('../utils/ebay/EbayUtils')

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

module.exports = router