const mongoose = require('mongoose');

// Defines the structure and validation rules for Contact documents in MongoDB
const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },

  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,

    // Validates that the email follows a basic email address format
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please enter a valid email address'
    ]
  },

  favoriteColor: {
    type: String,
    required: [true, 'Favorite color is required'],
    trim: true
  },

  birthday: {
    type: Date,
    required: [true, 'Birthday is required']
  }
});

// Creates the Mongoose model that will interact with the "contacts" collection
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;