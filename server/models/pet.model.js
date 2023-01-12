const mongoose = require('mongoose')

const Pet = new mongoose.Schema({
    name: String,
    personality: String,
    happiness: Number,
    adoptable: Boolean
},
{collection: 'pets'})

const model = mongoose.model('Pet', Pet)

module.exports = model