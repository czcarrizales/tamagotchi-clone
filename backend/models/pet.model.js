const mongoose = require('mongoose')

const Pet = new mongoose.Schema({
    name: String,
    personality: String,
    happiness: {type: Number, min: 0, max: 100, default: 50},
    hunger: {type: Number, min: 0, max: 100, default: 50},
    adoptable: Boolean,
    imageSrc: String
},
{collection: 'pets'})

const model = mongoose.model('Pet', Pet)

module.exports = model