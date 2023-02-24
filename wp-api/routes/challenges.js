const express = require('express')
const router = express.Router()
const Challenge = require('../models/challenge')
const mongoose = require('mongoose')

// get all
router.get('/', async (req, res) => {
  const { pathSlug } = req.query

  if (pathSlug) {
    const challenges = await Challenge.find({ pathSlug })
      .sort({ level: 'asc', order: 'asc' })
      .exec()
    res.json(challenges)
  } else {
    const challenges = await Challenge.find({}).sort({ level: 'asc', order: 'asc' }).exec()
    res.json(challenges)
  }
})

// get by id
router.get('/:challengeId', async (req, res) => {
  const { challengeId } = req.params

  if (!mongoose.Types.ObjectId.isValid(challengeId)) {
    return res.status(400).json({ message: 'Invalid challengeId' })
  }

  const challenge = await Challenge.findById(challengeId).exec()
  res.json(challenge)
})

// update

// add

// delete

module.exports = router
