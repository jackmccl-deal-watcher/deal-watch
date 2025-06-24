const express = require('express')

const router = express.Router()

const cors = require('cors')
// Enable CORS for all routes
router.use(cors())


module.exports = router