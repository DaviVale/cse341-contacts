const mongoose = require('mongoose');
const Contact = require('../models/contact');

// Returns all contacts stored in the contacts collection
const getAll = async (req, res) => {
  try {
    const contacts = await Contact.find();

    return res.status(200).json(contacts);
  } catch (error) {
    // Handles unexpected database or server errors
    return res.status(500).json({
      error: 'Failed to retrieve contacts'
    });
  }
};

// Returns one contact using its MongoDB ObjectId
const getSingle = async (req, res) => {
  try {
    const contactId = req.params.id;

    // Validates the MongoDB ObjectId format before querying the database
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({
        error: 'Invalid contact ID'
      });
    }

    const contact = await Contact.findById(contactId);

    // Returns 404 when the id is valid but no document exists
    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found'
      });
    }

    return res.status(200).json(contact);
  } catch (error) {
    // Handles unexpected errors while retrieving the contact
    return res.status(500).json({
      error: 'Failed to retrieve contact'
    });
  }
};

// Creates a new contact using the validation rules defined in the Mongoose schema
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Ensures that every required contact field was provided
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    // Creates a document using the Contact model
    // Mongoose automatically applies schema validation before saving
    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    // Returns the MongoDB id of the newly created contact
    return res.status(201).json({
      id: contact._id
    });
  } catch (error) {
    // Mongoose ValidationError is returned when schema validation fails
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: error.message
      });
    }

    // Handles unexpected database or server errors
    return res.status(500).json({
      error: 'Failed to create contact'
    });
  }
};

// Updates an existing contact using its MongoDB ObjectId
const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    // Prevents invalid MongoDB ids from reaching the database query
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({
        error: 'Invalid contact ID'
      });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Requires all contact fields for a complete PUT update
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      {
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday
      },
      {
        // Forces Mongoose schema validation during the update operation
        runValidators: true,

        // Returns the updated document instead of the old document
        new: true
      }
    );

    // Returns 404 when no document matches the supplied id
    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found'
      });
    }

    // 204 indicates that the update completed successfully
    return res.status(204).send();
  } catch (error) {
    // Handles invalid values such as an incorrectly formatted email or date
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({
        error: error.message
      });
    }

    return res.status(500).json({
      error: 'Failed to update contact'
    });
  }
};

// Deletes one contact using its MongoDB ObjectId
const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    // Validates the ObjectId before trying to delete the document
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({
        error: 'Invalid contact ID'
      });
    }

    const contact = await Contact.findByIdAndDelete(contactId);

    // Returns 404 when the requested contact does not exist
    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found'
      });
    }

    // 204 indicates successful deletion with no response body
    return res.status(204).send();
  } catch (error) {
    // Handles unexpected errors during the delete operation
    return res.status(500).json({
      error: 'Failed to delete contact'
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};