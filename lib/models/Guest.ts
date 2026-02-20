import mongoose, { Schema, Document } from 'mongoose'

export interface IGuest extends Document {
  name: string
  nameAmharic?: string
  title: string // e.g., "Dr.", "Professor", etc.
  profession: string // e.g., "Cardiologist", "Health Expert"
  photo?: string
  photos?: string[] // Gallery of additional photos
  description: string
  episodeUrl: string // Link to their episode
  episodeDate?: Date
  programName?: string // Name of the program they appeared on
  featured: boolean
  order: number
  createdAt: Date
}

const GuestSchema = new Schema<IGuest>({
  name: { type: String, required: true },
  nameAmharic: { type: String },
  title: { type: String, default: '' },
  profession: { type: String, required: true },
  photo: { type: String, default: '' },
  photos: { type: [String], default: [] },
  description: { type: String, required: true },
  episodeUrl: { type: String, required: true },
  episodeDate: { type: Date },
  programName: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Guest || mongoose.model<IGuest>('Guest', GuestSchema)
