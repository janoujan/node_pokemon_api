const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = process.env.PORT || 3000


app
    .use(express.json())
    .use(favicon(__dirname + '/favicon.ico'))
 
sequelize.initDb()

app.get('/', (req, res) => res.json('Hello Heroku !'))

require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/logging')(app)

// la gestion des erreurs
app.use(({res}) => {
    const message = 'impossible de trouver la ressource demandée ! vous pouvez essayer une autre URL'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`notre application Node est demarré sur hhtp://localhost:${port}`))
