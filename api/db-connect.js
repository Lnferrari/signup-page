import mongoose from 'mongoose'

const MONGO_URI = 'mongodb://localhost:27017/test_usersDB'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => console.log('Connection to database established!'))
.catch((err) => console.log('[ERROR] Connection failed!')) 