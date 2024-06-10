// delete.js

const express = require('express');
const router = express.Router();
const {getDb} = require('../../database');
const {ObjectId} = require('mongodb');

router.delete('/delete/news/:id', async (req, res) => {
    try {
        const db = getDb();
        const newsCollection = db.collection('news');
        const imagesCollection = db.collection('images');

        const newsId = new ObjectId(req.params.id);
        const news = await newsCollection.findOne({ _id: newsId });

        if (!news) {
            return res.status(404).json({ error: ' Новину не знайдено' });
        }

        // Видалення пов'язаних зображень
        const imageIds = news.image.map(imgUrl => new ObjectId(imgUrl.split('/').pop()));
        await imagesCollection.deleteMany({ _id: { $in: imageIds } });

        // Видалення об'єкта з колекції "news"
        await newsCollection.deleteOne({ _id: newsId });

        res.status(200).json({ message: 'Установку та пов\'язані з нею зображення успішно видалено' });
    } catch (error) {
        console.error('Помилка видалення закладу:', error);
        res.status(500).json({ error: 'Помилка видалення закладу' });
    }
});

module.exports = router;
