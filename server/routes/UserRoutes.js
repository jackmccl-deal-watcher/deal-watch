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
    try {
        const { username, password } = req.body
        
        if (board) {
            res.status(200).json(board)
        } else {
            console.error(`BoardID: ${boardID} not found`)
            res.status(404).json(`BoardID: ${boardID} not found`)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

// End user routes


module.exports = router