import mongoose, { Schema, Document } from 'mongoose'

export interface IUpdate extends Document {
  text: string
  emoji: string
  createdAt: Date
  active: boolean
}

const UpdateSchema = new Schema<IUpdate>({
  text: { type: String, required: true },
  emoji: { type: String, default: '📢' },
  createdAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
})

export default mongoose.models.Update || mongoose.model<IUpdate>('Update', UpdateSchema)
