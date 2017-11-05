'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

function restart () {
  mongoose.connection.collections['users'].drop((err) => {
    if (err) console.log(`Error al borrar la base de datos: ${err}`)

    console.log('Base de datos borrada. Creando usuarios...')
    createUserByDefault('usuario1', '123')
    createUserByDefault('usuario2', '456')
    createUserByDefault('usuario3', '789')
  })
}

function createUserByDefault (name, password) {
  let user = new User()
  user.name = name
  user.password = password

  user.save((err, userStored) => {
    if (err) return console.log(`Error al guardar el usuario: ${err}`)

    console.log('Usuario guardado correctamente')
  })
}

app.get('/api/login', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
    if (!users) return res.status(404).send({message: 'No existen productos'})

    res.status(200).send(users)
  })
})

mongoose.connect('mongodb://localhost:27017/users', (err, res) => {
  if (err) return console.log(`Error al conectar a la base de datos: ${err}`)
  console.log('Conexión a la base de datos establecida...')

  restart()

  app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
  })
})
