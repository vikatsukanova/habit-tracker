'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Map to fields in the DB
const bookSchema = exports.schema = new Schema({
  name: String,
  goal: Number,
  period: String,
  completed: Boolean,
})

exports.model = mongoose.model('Habit', bookSchema)
