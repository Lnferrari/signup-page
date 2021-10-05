import mongoose from 'mongoose'
const { Schema, model } = mongoose


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