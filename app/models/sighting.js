const mongoose = require('mongoose')

const sightingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  when: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toObjects: {virtuals: true}
})

module.exports = mongoose.model('Sighting', sightingSchema)
