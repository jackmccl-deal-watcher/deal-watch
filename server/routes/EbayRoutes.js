const express = require('express')
const { generateClientAccessToken } = require('../utils/ebay/EbayUtils')

const router = express.Router()

router.get('/client_token', async (req, res, next) => {
    try {
        const clientAccessToken = await generateClientAccessToken()
                
    } catch (error) {
        next(error)
    }
})

module.exports = router