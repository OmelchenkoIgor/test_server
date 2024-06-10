// documents.js

const express = require('express');
const router = express.Router();

//--------------------------------------------------------------------------------------------//
// Маршрути для закладнів
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

//--------------------------------------------------------------------------------------------//
// Маршрути для новин

const allNews = require('./news/all');
const uploadNews = require('./news/upload');
const selectedNews = require('./news/selectedNews');
const deleteNews = require('./news/delete');

// Маршрут для отримання всіх елементів колекції
router.use('/', allNews);

// Маршрут для додавання елементу в колекцію
router.use('/', uploadNews);

// Маршрут для вибору об'єктів за id
router.use('/', selectedNews);

// Маршрут для видалення об'єкта з колекції
router.use('/', deleteNews);

//--------------------------------------------------------------------------------------------//
// Маршрути для довідника

const allHandbook = require('./handbook/all');
const uploadHandbook = require('./handbook/upload');
const deleteHandbook = require('./handbook/delete');

// Маршрут для всіх елементів колекції
router.use('/', allHandbook);

// Маршрут для додавання елементу в колекцію
router.use('/', uploadHandbook);

// Маршрут для видалення об'єкта з колекції
router.use('/', deleteHandbook);

module.exports = router;
