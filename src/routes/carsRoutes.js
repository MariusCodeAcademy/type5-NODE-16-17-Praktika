const express = require('express');
const {
  carsIndex,
  createCar,
  singleCar,
} = require('../controller/carsController');

const carsRoutes = express.Router();

carsRoutes.get('/cars', carsIndex);
// GET /cars/:id   // req.params.id
carsRoutes.get('/cars/:id', singleCar);
carsRoutes.post('/cars', createCar);

module.exports = carsRoutes;
