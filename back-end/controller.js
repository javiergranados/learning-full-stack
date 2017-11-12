'use strict'

const User = require('./model')

function getAll (req, res) {
  console.log('GET /api/login')

  User.find({}, (err, users) => {
    let status, message

    if (err) {
      status = 500
      message = `Error al realizar la petición: ${err}`
    } else if (users.length === 0) {
      status = 200
      users = []
      message = 'No existen usuarios'
    } else {
      status = 200
    }

    res.status(status).send({message, users})
  })
}

function newUser (req, res) {
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
}

function getUser (req, res) {
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
        status = 200
        userStored = []
        message = 'El nombre de usuario o la contraseña no son correctos'
      } else {
        status = 200
        message = 'Login correcto'
      }

      res.status(status).send({message, userStored})
    })
  }
}

module.exports = {
  getAll,
  newUser,
  getUser
}
