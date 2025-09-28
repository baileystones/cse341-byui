const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

async function connectToDb() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db('myDatabase');
  console.log('Connected to MongoDB');
}

function getDb() {
  if (!db) throw Error('Database not initialized');
  return db;
}

module.exports = { connectToDb, getDb };
