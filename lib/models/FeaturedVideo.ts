import mongoose, { Schema, Document } from 'mongoose'

export interface IFeaturedVideo extends Document {
  videoId: string
  title: string
  thumbnail: string
  category: string
  order: number
  active: boolean
  createdAt: Date
}

const FeaturedVideoSchema = new Schema<IFeaturedVideo>({
  videoId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  category: { type: String, default: 'general' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.FeaturedVideo || mongoose.model<IFeaturedVideo>('FeaturedVideo', FeaturedVideoSchema)
