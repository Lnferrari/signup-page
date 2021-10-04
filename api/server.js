import './db-connect.js'
import express from 'express'
import cors from 'cors'

const app = express()


/* ----- EXPRESS MIDDLEWARE ----- */
app.use( express.json() )
app.use( cors() )

// ENDPOINTS --------------------
app.get('/', (req, res) => {
  res.send({ hello: 'users API'})
})


app.use('/signup', async (req, res, next) => {

})

app.use('/users', async (req, res, next) => {

})

// ================================================

const PORT = '5000'
app.listen(PORT, () => {
  console.log(`API has started successfully on PORT ${PORT}`)
})

// ERROR HANDLER ------------------
app.use( (err, req, res, next) => {
  res.status(err.status || 400).send({
    error: {
      message: err.message,
      status: err.status
    }
  })
})