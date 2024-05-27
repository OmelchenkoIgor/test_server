//index.js
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('../database');
const documentsRouter = require('../routes/documents');

const app = express();
const port = 7777;

app.use(cors()); // Використання CORS для всіх маршрутів
app.use(express.json()); // Для обробки тіл JSON

// Викликаємо функцію для підключення до бази даних при старті сервера
connectToDatabase().then(() => {
    app.use('/api', documentsRouter);

    module.exports = app; // Експортуємо додаток для Vercel

    app.listen(port, () => {
        console.log(`Сервер працює на порту: ${port}`);
    });
}).catch(error => {
    console.error('Помилка при старті сервера:', error);
});
