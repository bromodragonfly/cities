import { Schema, model } from 'mongoose'

// name - название города, subject - область
const Cities = new Schema({
  name: { type: String },
  subject: { type: String },
})

export default model('cities', Cities)
