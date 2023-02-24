const mongoose = require('mongoose')

const challengeSchema = new mongoose.Schema({
  name: String,
  description: String,
  brief: String,

  pathSlug: String,
  designId: String,
  resourceId: String,

  tags: [String],
  level: Number,
  order: Number,

  thumbnailImage: String,
})

module.exports = mongoose.model('Challenge', challengeSchema)
