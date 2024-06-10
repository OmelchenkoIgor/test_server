// all.js

const express = require('express');
const router = express.Router();
const { getDb } = require('../../database');

router.get('/news', async (req, res) => {
    try {
        console.log('Запит до /api отримано');
        const db = getDb();
        const collection = db.collection('news');
        const news = await collection.find({}).toArray();

        res.status(200).json(news);
    } catch (error) {
        console.error('Помилка при пошуку новин:', error);
        res.status(500).json({ error: 'Помилки при отриманні новин' });
    }
});

module.exports = router;
