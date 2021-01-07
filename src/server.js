require('dotenv').config()

const knex = require('knex')
const app = require('./app')
const { SSL, PORT, DATABASE_URL } = require('./config')

const db = knex({
  client: 'pg',
  debug: true,
  connection: DATABASE_URL,
  ssl: SSL
})

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
