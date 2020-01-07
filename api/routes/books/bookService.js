'use strict'

const { model: Habit } = require('./bookModel')

// Helper function to list each of the books in the database
exports.listBooks = async () => {
  try {
    const books = await Habit.find({})
    return books
  } catch (e) {
    // If we're catching an error only to throw it again, we can just remove the try/catch
    throw e
  }
}

// Create a new book that will be added to the database
exports.createBook = async (bookData) => {
  // 1. Create a book instance
  const book = new Habit(bookData)
  try {
    // 2. Save book to database
    const doc = await book.save()
    // 3. return with created book
    console.log({doc})
    return doc
  } catch (e) {
    // 4. If error, throw and controller will catch
    throw e
  }
}

exports.deleteHabit = async (id) => {
  try {
    const deletedHabit = await Habit.deleteOne({_id: id})
    return deletedHabit
  } catch (e) {
    throw e
  }
}

exports.updateHabit = async (habitData) => {
  const { id } = habitData;
  console.log({id})
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(id, {completed: 'true'}, {new: true})
    console.log({updatedHabit})
    return updatedHabit
  } catch (e) {
    throw e
  }
}

exports.editHabit = async (habitData) => {
  const { id, name, goal, period } = habitData;
  console.log({id, name, goal, period})
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(id, {name: name, goal: goal, period: period}, {new: true})
    console.log({updatedHabit})
    return updatedHabit
  } catch (e) {
    throw e
  }
}

exports.getHabitById = async (id) => {
  try {
    const habit = await Habit.findById(id);
    return habit;
  } catch (ex) {
    throw new Error(ex.message);
  }
}
