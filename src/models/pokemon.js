const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'le nom est déja pris'
    },
     validate: {
        notEmpty: {msg: 'Le nom ne peut pas être vide'},
        notNull: {msg: 'le nom est une propriété requise.'}
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {msg: 'Utilisez uniquement des nombres entiers pour les points de vie.'},
        notNull: {msg: 'les points de vie sont une propriété requise.'},
        min: {
            args: [0],
            msg: 'les points de vies doivent être supérieurs ou égal à zéro'
            },
        max: {
            args: [999],
            msg: 'les points de vies doivent être inférieurs ou égal à 999'
            }
        }
        }  
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {msg: 'Utilisez uniquement des nombres entiers pour les points de dégats.'},
        notNull: {msg: 'les points de dégats sont une propriété requise.'},
        min: {
            args: [0],
            msg: 'les points de dégats doivent être supérieurs ou égal à zéro'
            },
        max: {
            args: [99],
            msg: 'les points de dégats doivent être inférieurs ou égal à 99'
            }
        }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: {msg: 'Utilisez uniquement des URL valides pour l\'image.'},
        notNull: {msg: 'l\'image est une propriété requise.'}
        }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
    get() {
            return this.getDataValue('types').split(',')
        },
    set(types) {
            this.setDataValue('types', types.join())
        },
    validate: {
        isTypesValid(value) {
                if (!value) {
                throw new Error('un pokémon doit au moins avoir un type.')
                }
                if (value.split(',').length > 3) {
                    throw new Error('un pokémon ne peut pas avoir plus de trois types.')
                }
                value.split(',').forEach( type => {
                    if (!validTypes.includes(type)) {
                        throw new Error(`le type du pokémon doit appartenir à la liste suivante: ${validTypes}`)
                    }
                })
            }
        }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}