const { getDb } = require('../db/connection');
const { ObjectId } = require('mongodb');

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await getDb().collection('contacts').find().toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one contact by ID
const getContactById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }
    const contact = await getDb().collection('contacts').findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await getDb().collection('contacts').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const result = await getDb().collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      { $set: { firstName, lastName, email, favoriteColor, birthday } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.sendStatus(204); // success, no content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }

    const result = await getDb().collection('contacts').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { 
  getAllContacts, 
  getContactById, 
  createContact, 
  updateContact, 
  deleteContact 
};
