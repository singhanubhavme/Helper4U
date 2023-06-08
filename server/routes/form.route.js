const express = require('express');
const router = express.Router();
const connection = require('../config/db.config');

router.get('/submitted', (req, res) => {
  const sql = `SELECT * from user;`;
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(401).json({
        status: 'fail',
        data: [],
      });
    } else {
      return res.status(200).json({
        status: 'success',
        data: results,
      });
    }
  });
});

router.post('/submit', (req, res) => {
  const { name, email, phone, dob, address } = req.body.data;
  const sql = `INSERT INTO user (name, email, phone, dob, address) VALUES ('${name}', '${email}', '${phone}', '${dob}', '${address}');`;
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(401).json({
        status: 'fail',
      });
    } else {
      return res.status(200).json({
        status: 'success',
      });
    }
  });
});

module.exports = router;
