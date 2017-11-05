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
  mongoose.connection.db.dropDatabase()
  console.log('Base de datos reiniciada')
}

app.get('/api/login', (req, res) => {
  console.log('GET /api/login')

  User.find({}, (err, users) => {
    let status, message

    if (err) {
      status = 500
      message = `Error al realizar la petición: ${err}`
    } else if (users.length === 0) {
      status = 400
      message = 'No existen usuarios'
    } else {
      status = 200
    }

    res.status(status).send({message, users})
  })
})

app.post('/api/login', (req, res) => {
  console.log('POST /api/login')
  console.log(req.body)

  let status, message
  if (!req.body.name || !req.body.password) {
    status = 400
    message = 'Faltan campos obligatorios'

    res.status(status).send({message})
  } else {
    let user = new User()
    user.name = req.body.name
    user.password = req.body.password

    user.save((err, userStored) => {
      if (err) {
        status = 500
        message = `Error al realizar la petición: ${err}`
      } else {
        status = 200
        message = 'Usuario guardado correctamente'
      }

      res.status(status).send({message, userStored})
    })
  }
})

app.put('/api/login', (req, res) => {
  console.log('PUT /api/login')
  console.log(req.body)

  let status, message
  if (!req.body.name || !req.body.password) {
    status = 400
    message = 'Faltan campos obligatorios'

    res.status(status).send({message})
  } else {
    User.findOne({'name': req.body.name, 'password': req.body.password}, (err, userStored) => {
      if (err) {
        status = 500
        message = `Error al realizar la petición: ${err}`
      } else if (!userStored) {
        status = 401
        message = 'El nombre de usuario o la contraseña no son correctos'
      } else {
        status = 200
        message = 'Login correcto'
      }

      res.status(status).send({message, userStored})
    })
  }
})

mongoose.connect('mongodb://localhost:27017/appDatabase', (err, res) => {
  if (err) return console.log(`Error al conectar a la base de datos: ${err}`)

  console.log('Conexión a la base de datos establecida...')
  restart()

  app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
  })
})
