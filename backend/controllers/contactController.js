const asyncHandler = require('express-async-handler');
const db = require('../config/db');

const getmessages = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM messages';
  const messages = await db.query(query);
  res.status(200).json(messages);
});

const addmessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Check if title is missing
    if (!message) {
      res.status(400).json({ message: 'Please fill in all the required fields' });
      return;
    }



    const date = new Date(); // Get the current date and time

    // Format the date as a MySQL DATETIME string
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

    // Insert the file data into the database
    const insertmessageQuery = `
      INSERT INTO messages (
        name, 
        email, 
        message,
        date
      ) VALUES (?, ?, ?, ?)
    `;

    const result = await db.query(insertmessageQuery, [
      name, 
      email, 
      message,
      formattedDate, // Use the formatted date
    ]);

    const newmessage = {
      id: result.insertId,
      name, 
      email, 
      message,
      date: formattedDate, // Respond with the formatted date
    };

    res.status(200).json(newmessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const subscribe = async (req, res) => {
  try {
    const {email} = req.body;

    
    // Check if title is missing
    if (!email) {
      res.status(400).json({ message: 'Please fill in all the required fields' });
      return;
    }



    const date = new Date(); // Get the current date and time

    // Format the date as a MySQL DATETIME string
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

    // Insert the file data into the database
    const insertemailQuery = `
      INSERT INTO subscriptions (
        email,
        date
      ) VALUES (?, ?)
    `;

    const result = await db.query(insertemailQuery, [
      email,
      formattedDate, // Use the formatted date
    ]);

    const newsubscription = {
      id: result.insertId,
      email, 
      date: formattedDate, // Respond with the formatted date
    };

    res.status(200).json(newsubscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getmessages,
  addmessage,
  subscribe
};
