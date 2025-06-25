// Start imports and setup
const express = require('express')

const router = express.Router()

const cors = require('cors')
// Enable CORS for all routes
router.use(cors())

const mongoose = require('../Mongoose.js')

// End imports and setup

// Start user routes

// User login
router.get('/login', async (req, res) => {

})

// End user routes


module.exports = router