// Start imports and setup
const express = require('express')
const app = express()
const PORT = 3000

const cors = require('cors')
// Enable CORS for all routes
app.use(cors())

// End imports and setup

// Start routes

const UserRoutes = require('./UserRoutes.js')
app.use('/api/user', UserRoutes)

const PartsRoutes = require('./PartsRoutes.js')
app.use('/api/parts', PartsRoutes)

const BuildsRoutes = require('./BuildsRoutes.js')
app.use('/api/builds', BuildsRoutes)

// End routers

// Start index functions

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    try {
        res.send('Welcome to deal watch!')
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

// End index functions