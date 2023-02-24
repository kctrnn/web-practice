const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { loginSchema, registerSchema } = require('../validation')
const User = require('../models/user')

// login
router.post('/login', async (req, res) => {
  try {
    await loginSchema.validate(req.body)
  } catch (error) {
    return res.status(400).jsonp({ error: error.errors?.[0] || 'Invalid email or password' })
  }

  //   check if email is exist
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).json({ message: 'Email is not found' })

  // password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).json({ message: 'Invalid password' })

  const token = jwt.sign({ sub: user._id }, process.env.PRIVATE_KEY)

  res.jsonp({ accessToken: token })
})

// register
router.post('/register', async (req, res) => {
  try {
    await registerSchema.validate(req.body)
  } catch (error) {
    return res.status(400).jsonp({ error: error.errors?.[0] || 'Invalid user' })
  }

  //   check if user is exist
  const user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).json({ message: 'Email already exists' })

  const hashPassword = await bcrypt.hash(req.body.password, 10)
  const newUser = new User({
    ...req.body,
    password: hashPassword,
    avatarUrl: '',
    bio: '',
  })

  await newUser.save()
  const token = jwt.sign({ sub: newUser._id }, process.env.PRIVATE_KEY)

  res.jsonp({ accessToken: token })
})

module.exports = router
