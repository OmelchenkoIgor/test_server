// documents.js

const express = require('express');
const router = express.Router();

const allRouter = require('./establishments/all');
const uploadRouter = require('./establishments/upload');
const imageRouter = require('./establishments/image');
const deleteRouter = require('./establishments/delete');
const typeRouter = require('./establishments/type');
const selectedEstablishment = require('./establishments/selectedEstablishment');


// Маршрут для всіх елементів колекції
router.use('/', allRouter);

// Маршрут для додавання елементу в колекцію
router.use('/', uploadRouter);

// Маршрут для картинки
router.use('/', imageRouter);

// Маршрут для видалення об'єкта з колекції 'establishments' за id та пов'язаних зображень з колекції 'images'
router.use('/', deleteRouter);

// Маршрут для вибору об'єктів за типом
router.use('/', typeRouter);

// Маршрут для вибору об'єктів за id
router.use('/', selectedEstablishment);

module.exports = router;
