const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const { success     } = require('./helper')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))

app.get('/', (req, res) => res.send('hello, express!'))
app.get('/api/pokemons/', (req, res) => {
    const message = 'la liste des pokémon a été trouvé !'
    res.json(success(message, pokemons))
})
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'un pokémon a bien été trouvé !'
    res.json(success(message, pokemon))
})
app.listen(port, () => console.log(`notre application Node est demarré sur hhtp://localhost:${port}`))
