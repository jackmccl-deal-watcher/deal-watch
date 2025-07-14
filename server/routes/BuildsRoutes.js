const express = require('express')
const { generateBuilds } = require('../modules/builds/GenerateBuilds')
const { saveBuild } = require('../utils/BuildsUtils')

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
        console.log(build)
        const savedBuild = await saveBuild(build)
        res.status(200).json({ 'status': 'success', 'message': `Build ${build.title} successfully saved!`, 'saved_build': savedBuild })
    } catch (error) {
        next(error)
    }
})

module.exports = router