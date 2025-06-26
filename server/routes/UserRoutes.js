// Start imports and setup
const express = require('express')
const { hashPassword, verifyPassword } = require('../utils/argon.js')
const { createUser, getUser} = require('../utils/UserUtils.js')
const router = express.Router()

const cors = require('cors')
// Enable CORS for all routes
router.use(cors())

const mongoose = require('../Mongoose.js')

// End imports and setup

// Start user routes

// Create user
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body
        const hashedPassword = await hashPassword(password)
        await createUser(username, hashedPassword)
        req.session.user = username
        res.status(201).json(`${username} user successfully created`)
    } catch (error) {
        console.error(error)
        res.status(500).json({ "error": error.message.toString() })
    }
})

// User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await getUser(username)
        if (await verifyPassword(password, user.password)) {
            req.session.user = username
            res.status(200).send()
        } else {
            res.status(401).send()
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ "error": error.message.toString() })
    }
})

// Log user out

router.post('/logout', async (req, res) => {
    try {
        req.session.user = null
        res.status(200).send()
    } catch (error) {
        console.error(error)
        res.status(500).json({ "error": error.message.toString() })
    }
})

// End user routes


module.exports = router