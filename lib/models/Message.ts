import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IMessage extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  subject: string
  message: string
  date: Date
  read: boolean
}

const MessageSchema = new Schema<IMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: 'No Subject' },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
}, {
  timestamps: true
})

// Prevent model recompilation in development
const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema)

export default Message
