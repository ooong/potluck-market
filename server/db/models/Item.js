const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.TEXT,
  iconUrl: {
    type: Sequelize.STRING,
    defaultValue: './icons/foodbunch2.svg'
  }
})

module.exports = Item
