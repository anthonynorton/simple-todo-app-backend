const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const dbConfig = require('./app/config/db')
const assert = require('assert')
const app = express()
const PORT = process.env.PORT || 8000

// Set app up to parse body of requests with bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// ROUTES
assert.ok(typeof dbConfig.url === 'string', 'Database URI must be a string.')
MongoClient.connect(
  dbConfig.url,
  (err, database) => {
    assert.equal(null, err)
    console.log('Successfully connected the database.')
    const db = database.db(dbConfig.name)
    require('./app/routes')(app, db)

    app.listen(PORT, () => {
      console.log(`\nServer now listening on port ${PORT}.\n`)
    })
  },
)
