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


const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/hackathons', require('./routes/hackathonRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend (assuming frontend build is in the "frontend/build" directory)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

// No need to call db.connect(); anymore

app.listen(port, () => console.log(`Server started on port ${port}`));
