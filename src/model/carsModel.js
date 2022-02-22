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

module.exports = {
  getCarsFromDb,
};
