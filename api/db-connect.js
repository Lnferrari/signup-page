import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => console.log('Connection to database established!'))
.catch((err) => console.log('[ERROR] Connection failed!')) 