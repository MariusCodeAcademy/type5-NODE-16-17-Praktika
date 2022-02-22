const express = require('express');
const { carsIndex } = require('../controller/carsController');

const carsRoutes = express.Router();

carsRoutes.get('/cars', carsIndex);

module.exports = carsRoutes;
