// delete.js

const express = require('express');
const router = express.Router();
const {getDb} = require('../../database');
const {ObjectId} = require('mongodb');

router.delete('/delete/establishments/:id', async (req, res) => {
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

module.exports = router;
