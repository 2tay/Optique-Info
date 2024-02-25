require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes')
const clientRoutes = require('./routes/clientRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')
const clientInfoRoutes = require('./routes/clientInfoRoutes')
const paymentRoutes = require('./routes/paymentRoutes')

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`Middleware-- Path: ${req.path}, Method: ${req.method}`);
    next();
});

app.use('/admins', adminRoutes)
app.use('/', clientRoutes)
app.use('/', appointmentRoutes)
app.use('/', clientInfoRoutes)
app.use('/payments', paymentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database');
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
