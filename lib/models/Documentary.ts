import mongoose from 'mongoose'

const documentarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ['Amharic', 'Oromiffa', 'Somali', 'Tigrinya', 'English']
  },
  duration: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  producer: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  gallery: [{
    type: String
  }],
  topics: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Production', 'Released', 'Coming Soon'],
    default: 'Coming Soon'
  }
}, {
  timestamps: true
})

export default mongoose.models.Documentary || mongoose.model('Documentary', documentarySchema)
