const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db.config');

const formRoutes = require('./routes/form.route');
const primeRoutes = require('./routes/prime.route');

const PORT = process.env.PORT;
const ORIGIN = process.env.CLIENT_URL;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: ORIGIN }));

app.use('/api/form', formRoutes);
app.use('/api/prime', primeRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Can't listen on port ${PORT}`);
  } else {
    console.log(`Listening on PORT ${PORT}`);
  }
});
