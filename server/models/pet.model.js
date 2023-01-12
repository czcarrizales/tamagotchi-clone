const mongoose = require('mongoose')

const Pet = new mongoose.Schema({
    name: String,
    personality: String
},
{collection: 'pets'})

const model = mongoose.model('Pet', Pet)

module.exports = model