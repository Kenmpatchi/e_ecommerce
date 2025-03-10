require('dotenv').config();
const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const app = express();
require('./db');

// MiDDLEWARE TO ANALYZE JSON
app.use(express.json());

// Routes
app.use('/api', orderRoutes)
app.use('/api', productRoutes);
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);


app.listen(3000,()=>{
  console.log('server connected')
});

