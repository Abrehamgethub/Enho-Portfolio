import mongoose, { Schema, Document } from 'mongoose'

export interface ISponsor extends Document {
  id?: string // Slug used for routing
  name: string
  nameAmharic?: string
  logo: string
  description: string
  website?: string
  programType: 'holiday' | 'regular' | 'charity' | 'special'
  programName: string // e.g., "Christmas Special 2024"
  programDate?: Date
  episodeUrl?: string // Link to the YouTube episode for this program
  photos: string[] // Gallery of photos from the program
  featured: boolean
  order: number
  createdAt: Date
}

const SponsorSchema = new Schema<ISponsor>({
  id: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  nameAmharic: { type: String },
  logo: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String },
  programType: { type: String, enum: ['holiday', 'regular', 'charity', 'special'], default: 'regular' },
  programName: { type: String, required: true },
  programDate: { type: Date },
  episodeUrl: { type: String },
  photos: [{ type: String }],
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Sponsor || mongoose.model<ISponsor>('Sponsor', SponsorSchema)
