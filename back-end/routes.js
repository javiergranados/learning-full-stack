'use strict'

const express = require('express')
const userController = require('./controller')
const api = express.Router()

api.get('/login', userController.getAll)
api.post('/login', userController.newUser)
api.put('/login', userController.getUser)

module.exports = api
