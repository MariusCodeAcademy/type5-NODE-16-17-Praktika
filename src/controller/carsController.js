const { getCarsFromDb, insertCarDb } = require('../model/carsModel');

async function carsIndex(req, res) {
  console.log('req.query ===', req.query);
  const allCars = await getCarsFromDb();
  if (allCars === false) {
    res.status(500);
    return;
  }
  res.json(allCars);
}

async function createCar(req, res) {
  const newCarData = req.body;
  const carAddingResult = await insertCarDb(newCarData);
  if (carAddingResult === false) {
    res.status(500);
    return;
  }
  res.json(carAddingResult);
}

module.exports = {
  carsIndex,
  createCar,
};
