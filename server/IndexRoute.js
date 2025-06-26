// Start imports and setup
const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
// Enable CORS for all routes
app.use(cors())

const session_max_age = 1000 * 60 * 5

const session = require('express-session')
let sessionConfig = {
    name: 'sessionId',
    secret: process.env.SESSION_SECRET,
    cookie: {
    maxAge: session_max_age,
    secure: process.env.RENDER ? true : false,
    httpOnly: false,
},
    resave: false,
    saveUninitialized: false,
}
// Attach session middlewar to app
app.use(session(sessionConfig))

app.set('trust proxy', 1)

// End imports and setup

// DB Setup

const mongoose = require('./Mongoose.js')

// End DB Setup

// Start routes

const UserRoutes = require('./routes/UserRoutes.js')
app.use('/api/user', UserRoutes)

const PartsRoutes = require('./routes/PartsRoutes.js')
app.use('/api/parts', PartsRoutes)

const BuildsRoutes = require('./routes/BuildsRoutes.js')
app.use('/api/builds', BuildsRoutes)

// End routers

// Start index functions

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    try {
        if (req.session.user) {
            res.send(`Welcome to deal watch ${req.session.user}!`)
        } else {
            res.send("Welcome to deal watch! Please login!")
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ "error": error.message.toString() })
    }
})

// End index functions