const express = require('express');
const { carsIndex, createCar } = require('../controller/carsController');

const carsRoutes = express.Router();

carsRoutes.get('/cars', carsIndex);
carsRoutes.post('/cars', createCar);

module.exports = carsRoutes;
