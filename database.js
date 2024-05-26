//database.js
const { MongoClient } = require('mongodb');

// URL підключення до MongoDB
const uri = 'mongodb+srv://igorVip:0967718853Qw@cluster0.drfbnur.mongodb.net/';

// Ім'я бази даних і колекції
const dbName = 'establishments';

let db;

async function connectToDatabase() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Підключено до MongoDB');
        db = client.db(dbName);
    } catch (error) {
        console.error('Помилка при підключенні до MongoDB:', error);
        throw error;
    }
}

function getDb() {
    if (!db) {
        throw new Error('База даних не підключена');
    }
    return db;
}

module.exports = connectToDatabase;
module.exports.getDb = getDb;
