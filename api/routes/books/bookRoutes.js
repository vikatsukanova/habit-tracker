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

  router.route('/')
    .delete(async (req, res, next) => {
    const { body } = req
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

  router.route('/')
  .patch(async (req, res, next) => {
    const { body } = req
    console.log({body})
    try {
      const updatedHabit = await bookService.updateHabit(body)
      
      res.status(200).send({
        data: [updatedHabit]
      })
    } catch (e) {
      next(e)
    }
  });

  router.route('/')
  .put(async (req, res, next) => {
    const { body } = req
    console.log({body})
    try {
      const updatedHabit = await bookService.editHabit(body)
      
      res.status(200).send({
        data: [updatedHabit]
      })
    } catch (e) {
      next(e)
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const book = await bookService.getHabitById(id);
      res.status(200).json({ data: book });
    } catch (ex) {
      console.log(ex);
      res.status(500).json({"error": "internal server error"})
    }
  })

exports.router = router
