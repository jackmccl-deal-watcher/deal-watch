const mongoose = require('mongoose')
mongoose.connect(import.meta.env.VITE_DB_CONNECTION, {dbName: 'deal-watch'})

module.exports = mongoose