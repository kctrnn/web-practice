const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const protectedRoute = require('../middlewares/protectedRoute')
const User = require('../models/user')

// get
router.get('/', protectedRoute, async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    const [tokenType, accessToken] = authHeader.split(' ')
    const payload = jwt.decode(accessToken)

    const user = await User.findById(payload.sub, 'name username email avatarUrl bio')

    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ message: 'Failed to parse token' })
  }
})

// update

module.exports = router
