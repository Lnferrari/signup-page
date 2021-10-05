import dotenv from 'dotenv'
import './db-connect.js'
import express from 'express'
import cors from 'cors'
import cloudinary from 'cloudinary'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'

const app = express();
export const JWT_TOKEN = 'holySecret99!'

// CONFIG --------------------

dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

/* ----- EXPRESS MIDDLEWARE ----- */
app.use( express.json({ limit: '1MB' }) )
app.use( cors({
  origin: 'http://localhost:3000',
  credentials: true
}) )
app.use( cookieParser() )


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
// app.post('/signup', async (req, res, next) => {
//   try {
//     const { avatar, ...userData } = req.body

//     const uploadResponse = await cloudinary.v2.uploader.upload(avatar, {
//       overwrite: true,
//       invalidate: true,
//       width: 600, height: 400, crop: "fill"
//     })

//     if (uploadResponse.error) {
//       return new Error(`Ups! Something went wrong`)
//     }

//     const newUser = await User.create({
//       ...userData,
//       avatar: uploadResponse.secure_url
//     })

//     const token = newUser.generateToken()
    
//     res
//       .cookie('token', token, {
//         expires: new Date(Date.now() + 172800000),
//         sameSite: 'None',
//         secure: true,
//         httpOnly: true
//       })
//       .json( newUser )
//   } catch (err) {
//     next(err)
//   }
// })


// app.post('/login', async (req, res, next) => {
//   try {
//     const { username } = req.body
//     const user = await User.findOne({ username })
//     if (!user) throw new Error(`Username not valid`)

//     const token = user.generateToken()

//     res
//       .cookie('token', token, {
//         expires: new Date(Date.now() + 172800000),
//         sameSite: 'None',
//         secure: true,
//         httpOnly: true
//       })
//       .json(user)
//   } catch (err) {
//     next(err)
//   }
// })

// app.get('/users', authentication, async (req, res, next) => {

//   const token = req.cookies.token

//   if (!token) {
//     return next(new Error(`You need to be registered to be here`))
//   }

//   try {
//     const userDecoded = jwt.verify(token, JWT_TOKEN)
//     req.user = userDecoded

//     const users = await User.find().sort('username')
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })



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