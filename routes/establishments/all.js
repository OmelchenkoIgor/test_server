// all.js

const express = require('express');
const router = express.Router();
const { getDb } = require('../../database');

router.get('/', async (req, res) => {
    try {
        console.log('Запит до /api отримано');
        const db = getDb();
        const collection = db.collection('establishments');
        const establishments = await collection.find({}).toArray();

        res.status(200).json(establishments);
    } catch (error) {
        console.error('Помилка при пошуку закладів:', error);
        res.status(500).json({ error: 'Помилки при отриманні закладів' });
    }
});

module.exports = router;
