import mongoose from 'mongoose'

const socialStatsSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    unique: true
  },
  handle: {
    type: String,
    required: true
  },
  followers: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

export default mongoose.models.SocialStats || mongoose.model('SocialStats', socialStatsSchema)
