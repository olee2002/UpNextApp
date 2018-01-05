const mongoose = require('mongoose')
const Schema = require('../schema')

const Item = mongoose.model('Item', Schema.ItemSchema)

module.exports = Item