'use strict'

const mongoose = require('mongoose')
const express = require('express')
const { ValidationError } = mongoose;
const path = require('path');

// 1. Create main express intance
const app = express()

// 2. Require routes
const { router: bookRoutes } = require('./routes/books/bookRoutes')

// 3. Require conatants
const { URL, PORT } = require('./utils/constants')

// 4. Ensure that the router is parsing the request body to appropriately format incoming requests

const publicPath = path.resolve(__dirname, '..', 'build');

// Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 5. Utilise routes
app.use('/', express.static(publicPath));
app.use('/api/books', bookRoutes)
app.use('/*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
})

app.use((err, req, res, next ) => {
  if (err instanceof ValidationError) {
    //handle the validation error
    res.status(400).send()
  } else {
    res.status(500).send()
  }
})

// 6. Define configuration for mongodb
const MONGO_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// 7. Start server
mongoose
  .connect(URL, MONGO_CONFIG)
  .then(async () => {
    console.log(`Connected to database at ${URL}`)
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
