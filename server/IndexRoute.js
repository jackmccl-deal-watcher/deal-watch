// Start imports and setup
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('./Mongoose.js')
const { ErrorMiddleware } = require('./middleware/ErrorMiddleware.js')
require('dotenv').config()

const SESSION_MAX_AGE = 1000 * 60 * 5

let sessionConfig = {
    name: 'sessionId',
    secret: process.env.SESSION_SECRET,
    cookie: {
    maxAge: SESSION_MAX_AGE,
    secure: process.env.RENDER ? true : false,
    httpOnly: false,
},
    resave: false,
    saveUninitialized: false,
}

const app = express()
const PORT = process.env.PORT


// End imports and setup

// Start routes and middlewares

app.use(cors())
app.use(bodyParser.json())
app.use(session(sessionConfig))
app.set('trust proxy', 1)

const UserRoutes = require('./routes/UserRoutes.js')
app.use('/api/user', UserRoutes)

const PartsRoutes = require('./routes/PartsRoutes.js')
app.use('/api/parts', PartsRoutes)

const BuildsRoutes = require('./routes/BuildsRoutes.js')
app.use('/api/builds', BuildsRoutes)

app.use(ErrorMiddleware)

// End routes and middlewares

// Start index functions


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res, next) => {
    try {
        if (req.session.user) {
            res.send(`Welcome to deal watch ${req.session.user}!`)
        } else {
            res.send("Welcome to deal watch! Please login!")
        }
    } catch (error) {
        next(error)
    }
})

// End index functions