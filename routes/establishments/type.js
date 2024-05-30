// type.js

const express = require('express');
const router = express.Router();
const {getDb} = require('../../database');

router.get('/type/:type/:page', async (req, res) => {
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
        const pageSize = 4;
        const page = parseInt(req.params.page);

        if (isNaN(page) || page < 1) {
            return res.status(400).json({ error: 'Невірний номер сторінки' });
        }

        const skipAmount = (page - 1) * pageSize;
        const query = typeParam === 'all' ? {} : { type };

        if (typeParam !== 'all' && !type) {
            return res.status(400).json({ error: 'Неправильний тип' });
        }

        const totalCount = await collection.countDocuments(query);

        const establishments = await collection.find(query).skip(skipAmount).limit(pageSize).toArray();

        res.status(200).json({ establishments, totalCount });
    } catch (error) {
        console.error('Помилка при пошуку закладів за типом:', error);
        res.status(500).json({ error: 'Помилки при пошуку закладів за типом' });
    }
});

module.exports = router;
