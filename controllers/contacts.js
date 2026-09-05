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

module.exports = {
  getAll,
  getSingle
};