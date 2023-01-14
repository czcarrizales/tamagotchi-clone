const mongoose = require('mongoose')

const Pet = new mongoose.Schema({
    name: String,
    personality: String,
    happiness: Number,
    hunger: Number,
    adoptable: Boolean,
    imageSrc: String
},
{collection: 'pets'})

const model = mongoose.model('Pet', Pet)

module.exports = model