// documents.js
const express = require('express');
const { getDb } = require('../database');
const multer = require('multer');
const { ObjectId } = require('mongodb');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Маршрут для всіх елементів колекції
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

// Маршрут для додавання елементу в колекцію
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

// Маршрут для картинки
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

// Маршрут для видалення об'єкта з колекції "establishments" за id та пов'язаних зображень з колекції "images"
router.delete('/delete/:id', async (req, res) => {
    try {
        const db = getDb();
        const establishmentsCollection = db.collection('establishments');
        const imagesCollection = db.collection('images');

        const establishmentId = new ObjectId(req.params.id);
        const establishment = await establishmentsCollection.findOne({ _id: establishmentId });

        if (!establishment) {
            return res.status(404).json({ error: 'Заклад не знайдено' });
        }

        // Видалення пов'язаних зображень
        const imageIds = establishment.image.map(imgUrl => new ObjectId(imgUrl.split('/').pop()));
        await imagesCollection.deleteMany({ _id: { $in: imageIds } });

        // Видалення об'єкта з колекції "establishments"
        await establishmentsCollection.deleteOne({ _id: establishmentId });

        res.status(200).json({ message: 'Установку та пов\'язані з нею зображення успішно видалено' });
    } catch (error) {
        console.error('Помилка видалення закладу:', error);
        res.status(500).json({ error: 'Помилка видалення закладу' });
    }
});

// Маршрут для вибору об'єктів за типом
router.get('/type/:type', async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('establishments');

        const typeMap = {
            'barber-shops': 'Барбершоп',
            'coffee-shops': 'Кав\'ярня',
            'restaurants': 'Ресторан'
        };

        const typeParam = req.params.type;
        const type = typeMap[typeParam];

        // Якщо typeParam == 'all', встановлюємо query як порожній об'єкт
        const query = typeParam === 'all' ? {} : { type };

        // Перевіряємо, чи є type, якщо не 'all' і не знайдено в typeMap
        if (typeParam !== 'all' && !type) {
            return res.status(400).json({ error: 'Неправильний тип' });
        }

        const establishments = await collection.find(query).toArray();
        res.status(200).json(establishments);
    } catch (error) {
        console.error('Помилка при пошуку закладів за типом:', error);
        res.status(500).json({ error: 'Помилки при пошуку закладів за типом' });
    }
});

module.exports = router;
