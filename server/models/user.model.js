const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    quote: String,
    pet: mongoose.Schema.Types.ObjectId
},
{collection: 'user-data'})

const model = mongoose.model('UserData', User)

module.exports = model