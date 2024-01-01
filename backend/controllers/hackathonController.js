const asyncHandler = require('express-async-handler');
const db = require('../config/db');

const gethackathons = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM hackathons';
  const hackathons = await db.query(query);
  res.status(200).json(hackathons);
});

const addhackathon = async (req, res) => {
  try {
    const { title, introduction, description } = req.body;

    // Check if title is missing
    if (!title) {
      res.status(400).json({ message: 'Please fill in all the required fields' });
      return;
    }

    const newdate = new Date(); // Get the current date and time

    // Format the date as a MySQL DATETIME string
    const date = newdate.toISOString().slice(0, 19).replace('T', ' ');
    // Insert the file data into the database
    const inserthackathonQuery = `
      INSERT INTO hackathons (title, introduction, description, date) 
      VALUES (?, ?, ?, ?)
    `;

    const result = await db.query(inserthackathonQuery, [
      title,
      introduction,
      description,
      date,
    ]);

    const newhackathon = {
      id: result.insertId,
      title,
      introduction,
      description,
      date,
    };

    res.status(200).json(newhackathon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const deleteHackathon = asyncHandler(async (req, res) => {
  const hackathonId = req.params.id;

  // Check if the job with the given ID exists
  const checkQuery = 'SELECT * FROM hackathons WHERE id = ?';
  const existingHackathon = await db.query(checkQuery, [hackathonId]);

  if (existingHackathon.length === 0) {
    res.status(404).json({ message: 'Job not found' });
    return;
  }

  // If the job exists, proceed with deletion
  const deleteQuery = 'DELETE FROM hackathons WHERE id = ?';
  await db.query(deleteQuery, [hackathonId]);

  res.json({
    id, 
    title,
    introduction,
    description,
    date
 });
  res.status(200).json({ message: 'Job deleted successfully' });
});

const edithackathon = async (req, res) => {
  try {
    const { id } = req.params;
    

    const { 
      title,
      introduction,
      description,
     } = req.body;
     const date = Date.now();

    const findhackathonQuery = 'SELECT * FROM hackathons WHERE id = ?';
    const hackathon = await db.query(findhackathonQuery, [id]);

    if (hackathon.length === 0) {
      
      return res.status(404).json({ message: 'hackathon not found' });
     
    }


    // Update the file data in the database
    const updatehackathonQuery = `
      UPDATE hackathons 
      SET 
        title = ?,
        introduction = ?,
        description = ?,
        date = ?
      WHERE id = ?
    `;

    
    await db.query(updatehackathonQuery, [
      title,
      introduction,
      description,
      date,
      id
    ]);

    res.json({
       id, 
       title,
       introduction,
       description,
       date
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  gethackathons,
  addhackathon,
  edithackathon,
  deleteHackathon
};
