const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())

morgan.token('content', (request) =>
  request.method === 'POST' && request.body.name
    ? JSON.stringify(request.body)
    : null
)

app.get('/api/persons', function (req, res) {
    res.json(persons)
})

app.get('/api/info', (req, res) => {
        res.send(`
          <p>Phonebook has info for ${persons.length} people</p>
          <p>${Date()}</p>
        `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        res.json(person)
    }else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
    return maxId + 1
}

app.post('/api/persons', (req, res) => {
    const {name, number} = req.body

    if(!name || !number) {
        return res.status(400).json({error:'The name or number is missing'})
    }
    const foundPerson = persons.find(person => person.name.toLowerCase() === name.toLowerCase())

    if(foundPerson) {
        return res.status(400).json({error: 'name must be unique'})
    }

    const person = {
        name: name,
        number: number,
        id: generateId()
    }

    persons = persons.concat(person)

    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})