const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function getCarsFromDb() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.query('SELECT * FROM cars');
    await conn.close();
    return result;
  } catch (error) {
    console.log('getCarsFromDb: ', error);
    return false;
  }
}

async function insertCarDb(newCarData) {
  try {
    const { title, image, price, number_plates } = newCarData;
    const conn = await mysql.createConnection(dbConfig);
    const safeTitle = mysql.escape(title);
    const sql = `
    INSERT INTO cars (title, image, price, number_plates) 
    VALUES(?, ?, ?, ?)
    `;
    const [insertResult] = await conn.execute(sql, [
      title,
      image,
      price,
      number_plates,
    ]);
    await conn.close();
    return insertResult;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getSingleCarDb(id) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM cars WHERE id = ?';
    const [foundCar] = await conn.execute(sql, [id]);
    await conn.close();
    return foundCar;
  } catch (error) {
    console.log('getSingleCarDb ===', error);
    return false;
  }
}
async function removeCarDb(id) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'DELETE FROM cars WHERE id = ? LIMIT 1';
    const [deleteResult] = await conn.execute(sql, [id]);
    await conn.close();
    return deleteResult;
  } catch (error) {
    console.log('removeCarDb ===', error);
    return false;
  }
}

module.exports = {
  getCarsFromDb,
  insertCarDb,
  getSingleCarDb,
  removeCarDb,
};
