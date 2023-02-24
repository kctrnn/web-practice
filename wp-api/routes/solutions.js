const express = require('express')
const router = express.Router()
const Solution = require('../models/solution')
const mongoose = require('mongoose')

// get all
router.get('/', async (req, res) => {
  const { userId } = req.query

  if (userId) {
    const solutions = await Solution.find({ userId }).sort({ submittedAt: 'desc' }).exec()
    res.json(solutions)
  } else {
    const solutions = await Solution.find({ submitted: true }).sort({ submittedAt: 'desc' }).exec()
    res.json(solutions)
  }
})

// get
router.get('/:solutionId', async (req, res) => {
  const { solutionId } = req.params

  if (!mongoose.Types.ObjectId.isValid(solutionId)) {
    return res.status(400).json({ message: 'Invalid solutionId' })
  }

  const solution = await Solution.findById(solutionId).exec()
  res.json(solution)
})

// update
router.put('/:solutionId', async (req, res) => {
  const { solutionId } = req.params

  if (!mongoose.Types.ObjectId.isValid(solutionId)) {
    return res.status(400).json({ message: 'Invalid solutionId' })
  }

  try {
    const solution = await Solution.findByIdAndUpdate(solutionId, req.body, { new: true })
    res.status(200).json({ message: 'Update solution successfully', solution })
  } catch (error) {
    res.status(400).json({ message: 'Update solution failed' })
  }
})

// add
router.post('/', async (req, res) => {
  try {
    const newSolution = new Solution(req.body)
    const savedNewSolution = await newSolution.save()

    res.status(200).json({ message: 'Add solution successfully', solution: savedNewSolution })
  } catch (error) {
    res.status(400).json({ message: 'Add solution failed' })
  }
})

// delete

module.exports = router
