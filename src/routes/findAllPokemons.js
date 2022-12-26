const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    if (req.query.name) {
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5

      if (name.length < 2) {
        const message = 'le terme de recherche doit contenir au moins deux caracteres'
        return res.status(400).json({ message})
      }

      return Pokemon.findAndCountAll({ 
      where: {
         name: {
          [Op.like]: `%${name}%`
          }
        },
      order: ['name'],
      limit: limit
      })
      .then(({ count, rows }) => {
        const message = `il y a ${count} pokémons qui correspondent au terme de la recherche ${name}`
        res.json({ message, data: rows})
      })
    } else {
      Pokemon.findAll({ order: ['name'] })
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = "la liste des pokémons n'a pas put etre récupérée ; réessayer dans quelques instant"
        res.status(500).json({ message, data: error })
    })
    }
  })
}