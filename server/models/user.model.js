const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    quote: String
},
{collection: 'user-data'})

const model = mongoose.model('UserData', User)

module.exports = model