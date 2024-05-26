const express = require('express');
const connectToDatabase = require('../database');
const documentsRouter = require('../routes/documents');

const app = express();
const port = 7777;

app.use(express.json()); // To handle JSON bodies

// Викликаємо функцію для підключення до бази даних при старті сервера
connectToDatabase().then(() => {
    app.use('/api', documentsRouter);

    // Додатковий лог для перевірки
    app.get('/test', (req, res) => {
        res.send('Маршрут /test працює');
    });

    module.exports = app; // Експортуємо додаток для Vercel

    app.listen(port, () => {
        console.log(`Сервер працює на порту: ${port}`);
    });
}).catch(error => {
    console.error('Помилка при старті сервера:', error);
});
