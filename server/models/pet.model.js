const mongoose = require('mongoose')

const Pet = new mongoose.Schema({
    ownerId: String,
    name: String
},
{collection: 'pets'})

const model = mongoose.model('Pet', Pet)

module.exports = model