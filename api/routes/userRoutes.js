import express from 'express'
import auth from '../authentication/authentication.js'
import {
  getUsers,
  loginUser,
  createUser,
  verifyCookie
} from '../controllers/userControllers.js'


const router = express.Router()

router.route('/')
  .get(auth, getUsers)
  .post(createUser)

router.route('/login')
  .post(loginUser)

router.route('/auth')
  .post(auth, verifyCookie)

export default router