require('dotenv').config({ path: require('find-config')('.env') })
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_CONNECTION, {dbName: 'deal-watch'})

module.exports = mongoose