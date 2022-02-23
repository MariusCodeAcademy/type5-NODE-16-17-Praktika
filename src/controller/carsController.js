const {
  getCarsFromDb,
  insertCarDb,
  getSingleCarDb,
  removeCarDb,
} = require('../model/carsModel');

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

  // validacija
  const { title, image, price, number_plates } = newCarData;
  // TODO: Pagalvoti apie geresni buda patikrtinti reiksmes
  if (!title || !image || !price || !number_plates) {
    res.status(400).json({ error: 'Uzpildykite visus laukus' });
    return;
  }

  const carAddingResult = await insertCarDb(newCarData);
  if (carAddingResult === false) {
    res.status(500);
    return;
  }

  res.json(carAddingResult);
}

async function singleCar(req, res) {
  const { id } = req.params;
  const foundSingleCar = await getSingleCarDb(id);
  if (foundSingleCar === false) {
    res.status(500);
    return;
  }
  res.json(foundSingleCar);
}

async function deleteCar(req, res) {
  const { id } = req.params;
  const deleteResult = await removeCarDb(id);
  if (deleteResult === false) {
    res.status(500);
    return;
  }
  if (deleteResult.affectedRows !== 1) {
    res.json('no rows deleted');
    return;
  }
  res.json('Delete success');
}

module.exports = {
  carsIndex,
  createCar,
  singleCar,
  deleteCar,
};
