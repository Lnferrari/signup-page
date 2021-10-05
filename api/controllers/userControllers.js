import User from "../models/User.js";
import cloudinary from 'cloudinary'


export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort('username')
    res.json(users)
  } catch (err) {
    next(err)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { username } = req.body
    const user = await User.findOne({ username })
    if (!user) throw new Error(`Username not valid`)

    const token = user.generateToken()

    res
      .cookie('token', token, {
        expires: new Date(Date.now() + 172800000),
        sameSite: 'None',
        secure: true,
        httpOnly: true
      })
      .json(user)
  } catch (err) {
    next(err)
  }
}

export const createUser = async (req, res, next) => {
  try {
    const { avatar, ...userData } = req.body

    const uploadResponse = await cloudinary.v2.uploader.upload(avatar, {
      overwrite: true,
      invalidate: true,
      width: 600, height: 400, crop: "fill"
    })

    if (uploadResponse.error) {
      return new Error(`Ups! Something went wrong`)
    }

    const newUser = await User.create({
      ...userData,
      avatar: uploadResponse.secure_url
    })

    const token = newUser.generateToken()

    res
      .cookie('token', token, {
        expires: new Date(Date.now() + 172800000),
        sameSite: 'None',
        secure: true,
        httpOnly: true
      })
      .json( newUser )
  } catch (err) {
    next(err)
  }
}

export const verifyCookie = (req, res, next) => {
  res.send( req.user )
}

export const logoutUser = (req, res, next) => {
  res.clearCookie('token').json({
    message: `Logged out successfully!`
  })
}