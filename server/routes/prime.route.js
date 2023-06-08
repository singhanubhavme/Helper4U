const express = require('express');
const router = express.Router();

const isPrime = (number) => {
  for (let i = 2; i <= number / 2; i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
};
router.get('/:number', (req, res) => {
  const number = parseInt(req.params.number);
  if (number <= 1) {
    return res.status(200).json([]);
  }
  const primeNumbers = [];
  for (let i = 2; i <= number; i++) {
    if (isPrime(i)) {
      primeNumbers.push(i);
    }
  }
  res.status(200).json(primeNumbers);
});

module.exports = router;
