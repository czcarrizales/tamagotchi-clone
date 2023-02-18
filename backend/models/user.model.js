const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {type: String, unique: true},
    password: String,
    pet: mongoose.Schema.Types.ObjectId
},
{collection: 'user-data'})

const model = mongoose.model('UserData', User)

module.exports = model