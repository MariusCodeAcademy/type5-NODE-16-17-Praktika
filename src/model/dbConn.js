const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function checkConnection() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    console.log('Connected to DB');
    await conn.close();
  } catch (error) {
    console.log('checkConnection ===', error);
  }
}

module.exports = checkConnection;
