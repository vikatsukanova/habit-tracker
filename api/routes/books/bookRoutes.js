'use strict'

const express = require('express')
const router = express.Router()

const bookService = require('./bookService')

const { model: Habit } = require('./bookModel')

// GET /books/
router.route('/')
  .get(async (req, res, next) => {
    try {
      const books = await bookService.listBooks()
      res.status(200).send({
        data: books
      })
    } catch (e) {
      next(e)
    }
  })

// POST /books/
router.route('/')
  .post(async (req, res, next) => {
    const { body } = req
    console.log({body})
    try {
      const book = await bookService.createBook(body)
      res.status(200).send({
        data: [book]
      })
    } catch (e) {
      next(e)
    }
  })

  router.route('/delete')
    .delete(async (req, res, next) => {
    const { body } = req
    console.log({body})

    try {
      const success = await bookService.deleteHabit(body)

      if (success) {
        res.status(204).end()
      } else {
        res.status(404).end()
      }
    } catch (e) {
      next(e)
    }
  });


exports.router = router
