const express = require('express')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')

// get
router.get('/:userId', async (req, res) => {
  const { userId } = req.params

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid userId' })
  }

  const user = await User.findById(userId, 'name username email avatarUrl bio')
  res.json(user)
})

// update
router.put('/:userId', async (req, res) => {
  const { userId } = req.params

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid userId' })
  }

  try {
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true })
    res.status(200).json({ message: 'Update user successfully', user })
  } catch (error) {
    res.status(400).json({ message: 'Update user failed' })
  }
})

module.exports = router
