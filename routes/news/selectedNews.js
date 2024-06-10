// selectedNews.js

const express = require('express');
const router = express.Router();
const {getDb} = require('../../database');
const {ObjectId} = require('mongodb');

router.get('/news/:id', async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('news');
        const id = req.params.id;

        // Перевіряємо, чи `id` є правильним ObjectId для MongoDB
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Неправильний формат ID' });
        }

        const news = await collection.findOne({ _id: new ObjectId(id) });

        if (news) {
            res.status(200).json(news);
        } else {
            res.status(404).json({ error: 'Об\'єкт не знайдено' });
        }
    } catch (error) {
        console.error('Помилка при пошуку об\'єкта:', error);
        res.status(500).json({ error: 'Помилки при пошуку об\'єкта' });
    }
});

module.exports = router;
