const { getDb } = require('../db/connection');
const { ObjectId } = require('mongodb');

//Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await getDb().collection('contacts').find().toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};  

//Get one contact by ID
const getContactById = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const contact = await getDb().collection('contacts').findOne({ _id: id });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllContacts, getContactById };
