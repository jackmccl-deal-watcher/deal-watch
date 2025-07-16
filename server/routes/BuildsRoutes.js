const express = require('express')
const { generateBuilds } = require('../modules/builds/GenerateBuilds')
const { saveBuild, unSaveBuild, getSavedBuilds } = require('../utils/BuildsUtils')

const router = express.Router()

router.post('/generate_builds', async (req, res, next) => {
    try {
        const userAllocations = req.body
        const builds = await generateBuilds(userAllocations)
        res.status(200).json({ 'status': 'success', 'message': `Builds generated successfully!`, 'builds': builds })
    } catch (error) {
        next(error)
    }
})

router.post('/save_build', async (req, res, next) => {
    try {
        const build = req.body
        const response_message = await saveBuild(build, req.session.user)
        res.status(200).json(response_message)
    } catch (error) {
        next(error)
    }
})

router.post('/unsave_build', async (req, res, next) => {
    try {
        const build = req.body
        const response_message = await unSaveBuild(build, req.session.user)
        res.status(200).json(response_message)
    } catch (error) {
        next(error)
    }
})

router.get('/saved_builds', async (req, res, next) => {
    try {
        const savedBuilds = await getSavedBuilds(req.session.user)
        res.status(200).json({ 'status': 'success', 'message': `Saved builds for ${req.session.user} successfully fetched!`, 'saved_builds': savedBuilds })
    } catch (error) {
        next(error)
    }
})

module.exports = router