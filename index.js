const express = require('express')
const app = express()
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const filePath = path.join(__dirname, 'goodreads.db')
let db = null

let intitialization = async () => {
  try {
    db = await open({
      filename: filePath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('server is running')
    })
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
}

app.get('/', async (req, res) => {
  let result = await db.all('select * from book order by book_id limit 10 ;')
  res.send(result)
  console.log(req)
})

intitialization()
