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
    const duplicateUsernameCheck = await User.findOne({name: req.body.name})
    console.log(duplicateUsernameCheck)
    if (duplicateUsernameCheck !== null) {
        return res.json({status: 'duplicate username'})
    }
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            password: newPassword,
            pet: null
        })
        res.json({status: 'ok'})
    } catch (err) {
        console.log('error', err)
        res.json({status: 'error'})
    }
})

app.post('/api/login', async (req, res) => {
        const user = await User.findOne({
            name: req.body.name
        })
        if (user === null) {
            return res.json({status: 'username not found'})
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

        if (isPasswordValid) {
            const token = jwt.sign({
                name: req.body.name,
                pet: user.pet,
                _id: user._id
            }, 'secret123', {expiresIn: 60 * 10})
            console.log('found a matching email and password')
            return res.json({status: 'ok, found a matching email and password', user: token})
            
        } else {
            return res.json({status: 'error, email and/or password do not exist or match', user: false})
        }
})

app.get('/logout', async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
    console.log('logged out!')
})

app.get('/api/user-data', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    try {
    const decoded = jwt.verify(token, 'secret123')
    const name = decoded.name
    const user = await User.findOne({name: name})

    return res.json({status: 'ok', user: user})
    } catch(error) {
        console.log(error)
        res.json({status: 'error', error: 'invalid token'})
    }
})

app.get('/api/pet', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    try {
    const decoded = jwt.verify(token, 'secret123')
    const name = decoded.name
    const user = await User.findOne({name: name})
    const pet = await Pet.findById(user.pet)

    return res.json({status: 'ok', pet: pet})
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
            imageSrc: req.body.imageSrc,
            adoptable: false
        })
        console.log(decoded)
        console.log(pet)
        await User.updateOne({name: decoded.name}, {$set: {pet: pet._id}})
        res.json({status: 'ok'})
    } catch (err) {
        console.log('error', err)
    }
})

app.put('/api/pet', async(req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    try {
    const decoded = jwt.verify(token, 'secret123')
    const name = decoded.name
    const user = await User.findOne({name: name})
    const pet = await Pet.findByIdAndUpdate(user.pet, {adoptable: true})
    User.findOneAndUpdate({name: user.name}, {pet: null})
        .then(console.log('removed pet from user'))
    return res.json({status: 'ok', pet: pet})
    } catch(error) {
        console.log(error)
        res.json({status: 'error', error: 'invalid token'})
    }
})

app.get('/api/adoptable-pets', async (req, res) => {
    Pet.find({adoptable: true}, (error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.json(data)
            console.log(data)
        }
    })
    console.log('found adoptable pets')
})

app.put('/raise-happiness', async (req, res) => {
    try {
        const response = await Pet.findOneAndUpdate({_id: req.body._id, happiness: {$lte: 99}}, {$inc: {happiness: 1}}, {runValidators: true, new: true, upsert: true})
        res.send(response)
        console.log(response)
    } catch (err) {
        console.log(err)
    }
    
})

app.put('/raise-hunger', async (req, res) => {
    try {
        const response = await Pet.findOneAndUpdate({_id: req.body._id, hunger: {$lte: 99}}, {$inc: {hunger: 1}}, {new: true, runValidators: true, upsert: true})
        res.send(response)
        console.log(response)
    } catch (err) {
        console.log(err)
    }
})

app.put('/adopt-pet', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    try {
    const decoded = jwt.verify(token, 'secret123')
    const name = decoded.name
    const user = await User.findOne({name: name})
    if (user.pet == null) {
        await User.findOneAndUpdate({name: name}, {pet: req.body._id})
        const pet = await Pet.findByIdAndUpdate(req.body._id, {adoptable: false})
        return res.json({status: 'ok, pet adopted', pet: pet})
    } else {
        console.log('yo, this guy already has a pet!')
    }
    
    } catch {
        console.log('error!')
    }
})

app.get('', (req, res) => {
    res.send('hello world')
})

app.listen(5000, () => {
    console.log('server started!')
})