import dotenv from 'dotenv'
import './db-connect.js'
import express from 'express'
import cors from 'cors'
import cloudinary from 'cloudinary'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'

const app = express();

// CONFIG --------------------
dotenv.config()
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

/* ----- EXPRESS MIDDLEWARE ----- */
app.use( express.json({ limit: '1MB' }) )
app.use( cookieParser() )
app.use( cors({
  origin: 'https://signup-client-seven.vercel.app',
  credentials: true
}) )


// ENDPOINTS --------------------
app.get('/', (req, res) => {
  res.send({ hello: 'users API'})
})


// ROUTES -----------------------
app.use('/users', userRoutes)

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