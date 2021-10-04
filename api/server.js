import './db-connect.js'
import express from 'express'
import cors from 'cors'
import User from './models/User.js'
import dotenv from 'dotenv'
import cloudinary from 'cloudinary'

const app = express();
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/* ----- EXPRESS MIDDLEWARE ----- */
app.use( express.json({ limit: '1mb'}) )
app.use( cors() )

// ENDPOINTS --------------------
app.get('/', (req, res) => {
  res.send({ hello: 'users API'})
})


app.post('/signup', async (req, res, next) => {

})

app.get('/users', async (req, res, next) => {

})

app.use((req, res, next) => {
  const error = new Error(`Looks like you are lost...`)
  next(error)
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