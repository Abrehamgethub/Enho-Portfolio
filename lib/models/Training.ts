import mongoose from 'mongoose'

const trainingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['School Program', 'Teacher Training', 'Community Workshop', 'Health Camp', 'Online Course']
  },
  targetAudience: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  },
  gallery: [{
    type: String
  }],
  outcomes: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed'],
    default: 'Upcoming'
  }
}, {
  timestamps: true
})

export default mongoose.models.Training || mongoose.model('Training', trainingSchema)
