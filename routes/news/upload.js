// upload.js

const express = require('express');
const router = express.Router();
const {getDb} = require('../../database');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/uploadNews', upload.array('images', 1), async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('news');

        const imageDocuments = req.files.map(file => ({
            filename: file.originalname,
            contentType: file.mimetype,
            data: file.buffer,
        }));

        const imageIds = await Promise.all(imageDocuments.map(async (imgDoc) => {
            const result = await db.collection('images').insertOne(imgDoc);
            return result.insertedId;
        }));

        const newsDocument = {
            name: req.body.name,
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            link: req.body.link,
            image: imageIds.map(id => `https://test-server-lovat.vercel.app/api/image/${id}`)
        };

        const result = await collection.insertOne(newsDocument);
        res.status(201).json({ message: 'Успішно завантажено зображення на сайт', id: result.insertedId });
    } catch (error) {
        console.error('Помилка завантаження новини із зображеннями:', error);
        res.status(500).json({ error: 'Помилка завантаження новини із зображеннями' });
    }
});

module.exports = router;
