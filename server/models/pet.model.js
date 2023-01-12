const mongoose = require('mongoose')

const Pet = new mongoose.Schema({
    name: String,
    personality: String,
    happiness: Number
},
{collection: 'pets'})

const model = mongoose.model('Pet', Pet)

module.exports = model