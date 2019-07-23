const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    pictureUrl: String,
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: [Number],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

module.exports = mongoose.model('StreetArt', schema)
