import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const { Schema, model } = mongoose
const JWT_TOKEN = process.env.JWT_TOKEN

const UserSchema = new Schema({
  avatar: { type: String },
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true }
},
{
  timestamps: true,
  versionKey: false
})


UserSchema.methods.generateToken = function () {
  const user = this
  
  const token = jwt.sign(
    {username: user.username},
    JWT_TOKEN, {expiresIn: '1d'}
  )
  
  return token
}

const User = model('User', UserSchema)

export default User