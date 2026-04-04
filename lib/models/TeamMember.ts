import mongoose from 'mongoose'

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  year: String,
  details: String
})

const experienceSchema = new mongoose.Schema({
  title: String,
  organization: String,
  period: String,
  location: String,
  responsibilities: [String]
})

const certificationSchema = new mongoose.Schema({
  name: String,
  issuer: String,
  year: String
})

const trainingSchema = new mongoose.Schema({
  name: String,
  provider: String,
  year: String
})

const volunteerSchema = new mongoose.Schema({
  role: String,
  organization: String,
  period: String,
  description: String
})

const referenceSchema = new mongoose.Schema({
  name: String,
  title: String,
  organization: String,
  email: String,
  phone: String
})

const membershipSchema = new mongoose.Schema({
  organization: String,
  role: String,
  since: String
})

const teamMemberSchema = new mongoose.Schema({
  id: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  credentials: String,
  role: String,
  tagline: String,
  bio: String,
  image: String,
  socialLinks: {
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String,
    website: String
  },
  specialties: [String],
  education: [educationSchema],
  experience: [experienceSchema],
  certifications: [certificationSchema],
  trainings: [trainingSchema],
  skills: [String],
  languages: [String],
  volunteerWork: [volunteerSchema],
  publications: [String],
  contact: {
    email: String,
    phone: String,
    linkedin: String
  },
  references: [referenceSchema],
  memberships: [membershipSchema],
  order: { type: Number, default: 0 }
}, { timestamps: true })

// Add index for ordering
teamMemberSchema.index({ order: 1, createdAt: -1 })

export default mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema)
