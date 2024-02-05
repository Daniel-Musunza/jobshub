const path = require('path');
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorMiddleware');
const db = require('./config/db'); // Import your MySQL db connection setup
const port = process.env.PORT || 5000;

dotenv.config();

const app = express();

// origin: 'https://jetpulse.vercel.app',
const corsOptions = {  
  origin: 'https://jetpulse.vercel.app',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/hackathons', require('./routes/hackathonRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.get('/', (req, res) => res.send('Please set to production'));
app.use(errorHandler);

// No need to call db.connect(); anymore

app.listen(port, () => console.log(`Server started on port ${port}`));
