const express = require('express');

const carsRoutes = express.Router();

carsRoutes.get('/cars', carsIndex);

module.exports = carsRoutes;
