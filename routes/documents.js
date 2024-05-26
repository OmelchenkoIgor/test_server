// documents.js
const express = require('express');
const { getDb } = require('../database');

const router = express.Router();

// Route to get all establishments
router.get('/', async (req, res) => {
    try {
        console.log('Запит до /api отримано');
        const db = getDb();
        const collection = db.collection('establishments');
        const establishments = await collection.find({}).toArray();

        res.status(200).json(establishments);
    } catch (error) {
        console.error('Error retrieving establishments:', error);
        res.status(500).json({ error: 'Error retrieving establishments' });
    }
});

module.exports = router;
