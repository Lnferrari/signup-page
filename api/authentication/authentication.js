import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import { JWT_TOKEN } from "../server.js";

const auth = async (req, res, next) => {

  const token = req.cookies.token

  try {
    const decoded = jwt.verify(token, JWT_TOKEN)
    console.log('decoded =>' , decoded)
    const user = await User.findOne({username: decoded.username})
    console.log('user' , user)
    if (!user) next(new Error(`Authentication failed.`))

    req.user = user
    next()
  } catch (err) {
    next(err)
  }
  
}

export default auth