const { getCarsFromDb } = require('../model/carsModel');

async function carsIndex(req, res) {
  const allCars = await getCarsFromDb();
  if (allCars === false) {
    res.status(500);
    return;
  }
  res.json(allCars);
}

module.exports = {
  carsIndex,
};
