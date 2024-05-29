// upload.js

const express = require('express');
const router = express.Router();
const {getDb} = require('../../database');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.array('images', 3), async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('establishments');

        const imageDocuments = req.files.map(file => ({
            filename: file.originalname,
            contentType: file.mimetype,
            data: file.buffer,
        }));

        const imageIds = await Promise.all(imageDocuments.map(async (imgDoc) => {
            const result = await db.collection('images').insertOne(imgDoc);
            return result.insertedId;
        }));

        const establishmentDocument = {
            title: req.body.title,
            type: req.body.type,
            locations: req.body.locations,
            suggestions: JSON.parse(req.body.suggestions),
            image: imageIds.map(id => `https://test-server-lovat.vercel.app/api/image/${id}`)
        };

        const result = await collection.insertOne(establishmentDocument);
        res.status(201).json({ message: 'Успішно завантажено зображення на сайт', id: result.insertedId });
    } catch (error) {
        console.error('Помилка завантаження закладу із зображеннями:', error);
        res.status(500).json({ error: 'Помилка завантаження закладу із зображеннями' });
    }
});

module.exports = router;
