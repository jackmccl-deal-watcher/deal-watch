// Start imports and setup
const express = require('express')
const { verifyPassword } = require('../utils/argon.js')
const { createUser, getUser} = require('../utils/UserUtils.js')
const { UserLoginError, UserLogoutError } = require('../errors/UserErrors.js')
const router = express.Router()

const cors = require('cors')
// Enable CORS for all routes
router.use(cors())

const mongoose = require('../Mongoose.js')

// End imports and setup

// Start user routes

// Create user
router.post('/signup', async (req, res, next) => {
    try {
        const { username, password } = req.body
        await createUser(username, password)
        req.session.user = username
        res.status(201).json({ 'status': 'success', 'message': `${username} user successfully created`, 'username': username })
    } catch (error) {
        next(error)
    }
})

// User login
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await getUser(username)
        if (!user) {
            throw new UserLoginError('Invalid username or password!')
        }
        if (await verifyPassword(password, user.password)) {
            req.session.user = username
            res.status(200).json({ 'status': 'success', 'message': `${username} successfully logged in`, 'username': username })
        } else {
            throw new UserLoginError('Invalid username or password!')
        }
    } catch (error) {
        next(error)
    }
})

// Log user out

router.post('/logout', async (req, res, next) => {
    try {
        if (req.session.user) {
            const user = req.session.user
            req.session.user = null
            res.status(200).json({ 'status': 'success', 'message': `${user} successfully logged out` })
        } else {
            throw new UserLogoutError('No user logged in')
        }
    } catch (error) {
        next(error)
    }
})

// End user routes


module.exports = router