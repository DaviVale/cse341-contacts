const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const contacts = await mongodb
      .getDb()
      .collection('contacts')
      .find()
      .toArray();

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
};

const getSingle = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }

    const contact = await mongodb
      .getDb()
      .collection('contacts')
      .findOne({ _id: new ObjectId(contactId) });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve contact' });
  }
};

const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Every field is required to create a contact
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    const contact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    };

    // Add the new contact to MongoDB
    const result = await mongodb
      .getDb()
      .collection('contacts')
      .insertOne(contact);

    // Return the id of the contact that was created
    res.status(201).json({
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create contact'
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    // Check if the contact id is valid
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // All contact fields are required
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    const contact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    };

    // Update the contact using its MongoDB id
    const result = await mongodb
      .getDb()
      .collection('contacts')
      .updateOne(
        { _id: new ObjectId(contactId) },
        { $set: contact }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: 'Contact not found'
      });
    }

    // 204 means the update was completed successfully
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update contact'
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    // Check if the contact id is valid
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }

    // Delete the contact using its MongoDB id
    const result = await mongodb
      .getDb()
      .collection('contacts')
      .deleteOne({ _id: new ObjectId(contactId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: 'Contact not found'
      });
    }

    // 204 means the contact was deleted successfully
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
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