// images.js

const express = require('express');
const router = express.Router();
const {getDb} = require('../../database');
const {ObjectId} = require('mongodb');

router.get('/image/:id', async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('images');
        const image = await collection.findOne({ _id: new ObjectId(req.params.id) });

        if (!image) {
            return res.status(404).json({ error: 'Зображення не знайдено' });
        }

        res.set('Content-Type', image.contentType);
        res.send(image.data.buffer); // Correctly send the image buffer
    } catch (error) {
        console.error('Помилка при отриманні зображення:', error);
        res.status(500).json({ error: 'Помилка при отриманні зображення' });
    }
});

module.exports = router;
