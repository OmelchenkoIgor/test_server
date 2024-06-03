// upload.js

const express = require('express');
const router = express.Router();
const {getDb} = require('../../database');


router.post('/uploadHandbook', async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('handbook');

        const establishmentDocument = {
            title: req.body.title,
            addresses: req.body.addresses,
            phone_number: req.body.phone_number,
            email: req.body.email,
            schedule: req.body.schedule
        };

        const result = await collection.insertOne(establishmentDocument);
        res.status(201).json({ message: 'Успішно завантажено зображення на сайт', id: result.insertedId });
    } catch (error) {
        console.error('Помилка завантаження закладу із зображеннями:', error);
        res.status(500).json({ error: 'Помилка завантаження закладу із зображеннями' });
    }
});

module.exports = router;
