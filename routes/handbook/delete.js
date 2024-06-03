// delete.js

const express = require('express');
const router = express.Router();
const {getDb} = require('../../database');
const {ObjectId} = require('mongodb');

router.delete('/delete/handbook/:id', async (req, res) => {
    try {
        const db = getDb();
        const establishmentsCollection = db.collection('handbook');


        const handbookId = new ObjectId(req.params.id);
        const handbook = await establishmentsCollection.findOne({ _id: handbookId });

        if (!handbook) {
            return res.status(404).json({ error: 'Заклад не знайдено' });
        }

        // Видалення об'єкта з колекції "handbook"
        await establishmentsCollection.deleteOne({ _id: handbookId });

        res.status(200).json({ message: 'Довідник успішно видалено' });
    } catch (error) {
        console.error('Помилка видалення довідника:', error);
        res.status(500).json({ error: 'Помилка видалення довідника' });
    }
});

module.exports = router;
