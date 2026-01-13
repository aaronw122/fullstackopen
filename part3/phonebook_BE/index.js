require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./contact')

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))

app.use(express.static('dist'))

morgan.token('body', function getBody(req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :response-time[digits] :body'))

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  const update = {}

  if (typeof name !== 'undefined') update.name = name
  if (typeof number !== 'undefined') update.number = number

  Person.findByIdAndUpdate(
    request.params.id,
    { $set: update },
    { runValidators: true, new: true, context: 'query' },
  )
    .then((person) => {
      if (!person) {
        console.log('no person')
        return response.status(404).end()
      }
      response.json(person)
    })
    .catch((err) => next(err))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log('printing validation')
    return response.status(400).send({ error: error.message })
  }
  //if no more error handlers in chain, hands it to express built in handler
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
