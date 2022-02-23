const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');
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
  console.log('newCarData ===', newCarData);
  // validacija
  // const { title, image, price, number_plates } = newCarData;
  // TODO: Pagalvoti apie geresni buda patikrtinti reiksmes
  if (checkBody(newCarData)) {
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

async function testDb(req, res) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    res.json({
      success: 'connected to db',
    });
    await conn.close();
  } catch (error) {
    res.status(500).json({ error: 'failed to connect to db' });
  }
}

module.exports = {
  carsIndex,
  createCar,
  singleCar,
  deleteCar,
  testDb,
};

function checkBody(dataToCheck) {
  const mustBeKeys = ['title', 'image', 'price', 'number_plates'];
  const values = Object.values(dataToCheck);
  const valuesBool = values.map((val) => !!val).filter((val) => val === false);
  const ourKeys = Object.keys(dataToCheck);
  const allKeys = mustBeKeys.filter((mustKey) => !ourKeys.includes(mustKey));
  if (valuesBool.length > 0 || allKeys.length > 0) {
    console.log('ne visi duomenys paduoti');
    return true;
  }
  return false;
}
