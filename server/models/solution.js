const mongoose = require('mongoose')

const solutionSchema = new mongoose.Schema({
  title: String,
  description: String,

  demoUrl: String,
  repoUrl: String,
  feedbackRequest: String,

  challengeId: String,
  userId: String,

  createdAt: Number,
  updatedAt: Number,

  submitted: Boolean,
  submittedAt: Number,

  feedbacks: [{ userId: String, message: String }],
  votes: [String],
})

module.exports = mongoose.model('Solution', solutionSchema)
