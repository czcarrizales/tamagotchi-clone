const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Pet = require('./models/pet.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://user:user@cluster0.4votkmf.mongodb.net/tamagotchi-clone')

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })
        res.json({status: 'ok'})
    } catch (err) {
        console.log('error', err)
    }
})

app.post('/api/login', async (req, res) => {
        const user = await User.findOne({
            email: req.body.email,
        })

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

        if (isPasswordValid) {
            console.log(user)
            const token = jwt.sign({
                email: req.body.email,
                name: user.name
            }, 'secret123')
            return res.json({status: 'ok, found a matching email and password', user: token})
        } else {
            return res.json({status: 'error, email and/or password do not exist or match', user: false})
        }
})

app.get('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    const user = await User.findOne({email: email})

    return res.json({status: 'ok', quote: user.quote})
    } catch(error) {
        console.log(error)
        res.json({status: 'error', error: 'invalid token'})
    }
})

app.post('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    await User.updateOne({email: email}, {$set: {quote: req.body.quote}})
    return res.json({status: 'ok'})
    } catch(error) {
        console.log(error)
        res.json({status: 'error', error: 'invalid token'})
    }
})

app.post('/api/pet', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    try {
        const decoded = jwt.verify(token, 'secret123')
        const pet = await Pet.create({
            name: req.body.name,
            personality: req.body.personality,
            happiness: 100
        })
        console.log(decoded)
        console.log(pet)
        await User.updateOne({email: decoded.email}, {$set: {pet: pet._id}})
        res.json({status: 'ok'})
    } catch (err) {
        console.log('error', err)
    }
})

app.get('', (req, res) => {
    res.send('hello world')
})

app.listen(5000, () => {
    console.log('server started!')
})