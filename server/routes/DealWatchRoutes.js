const express = require('express')
const fetchDeals = require('../modules/deal-watch/FetchDeals')

const router = express.Router()

router.get('/display-deals', async (req, res, next) => {
    try {
        const { min_budget, max_budget } = req.query
        const deals = await fetchDeals(min_budget, max_budget)
        res.status(200).json({ 'status': 'success', 'message': `Deals retrieved successfully!`, 'deals': deals })
    } catch (error) {
        next(error)
    }
})

module.exports = router