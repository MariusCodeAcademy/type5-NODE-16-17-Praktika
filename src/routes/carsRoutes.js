const express = require('express');
const {
  carsIndex,
  createCar,
  singleCar,
  deleteCar,
} = require('../controller/carsController');

const carsRoutes = express.Router();

carsRoutes.get('/cars', carsIndex);
// GET /cars/:id   // req.params.id
carsRoutes.get('/cars/:id', singleCar);

// DELETE /cars/:id
carsRoutes.delete('/cars/:id', deleteCar);

carsRoutes.post('/cars', createCar);

module.exports = carsRoutes;
