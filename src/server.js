require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const carsRoutes = require('./routes/carsRoutes');
const checkConnection = require('./model/dbConn');

// const mysql = require('mysql2/promise');
// const dbConfig = require('./dbConfig');

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// routes
app.use('/', carsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  checkConnection();
});
