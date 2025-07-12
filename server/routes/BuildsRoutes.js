const express = require('express')
const { generateBuilds } = require('../modules/builds/GenerateBuilds')

const router = express.Router()

router.post('/generate_builds', async (req, res, next) => {
    try {
        const userAllocations = req.body
        const builds = generateBuilds(userAllocations)
        res.status(200).json({ 'status': 'success', 'message': `Builds generated successfully!`, 'builds': builds })
    } catch (error) {
        next(error)
    }
})

module.exports = router