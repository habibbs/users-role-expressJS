const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jwt = require('jsonwebtoken');


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);

app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Bismillah')
})

// Server listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});