// documents.js
const express = require('express');
const { getDb } = require('../database');
const multer = require('multer');
const { ObjectId } = require('mongodb');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

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
            image: imageIds.map(id => `https://test-server-lovat.vercel.app/image/${id}`)
        };

        const result = await collection.insertOne(establishmentDocument);
        res.status(201).json({ message: 'Establishment with images uploaded successfully', id: result.insertedId });
    } catch (error) {
        console.error('Error uploading establishment with images:', error);
        res.status(500).json({ error: 'Error uploading establishment with images' });
    }
});

router.get('/image/:id', async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('images');
        const image = await collection.findOne({ _id: new ObjectId(req.params.id) });

        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.set('Content-Type', image.contentType);
        res.send(image.data.buffer); // Correctly send the image buffer
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).json({ error: 'Error retrieving image' });
    }
});

module.exports = router;
