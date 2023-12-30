const asyncHandler = require('express-async-handler');
const db = require('../config/db');

const gethackathons = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM hackathons';
  const hackathons = await db.query(query);
  res.status(200).json(hackathons);
});

const addhackathon = async (req, res) => {
  try {
    const {
      title,
      introduction,
      description
    } = req.body;

   
    if (title) {
      res.status(400).json({ message: 'Please fill in all the required fields' });
      return;
    }
   
   

    // Insert the file data into the database
    const inserthackathonQuery = `
      INSERT INTO hackathons (title, introduction, description) 
      VALUES (?, ?, ?)
    `;

    const result = await db.query(inserthackathonQuery, [
        title,
        introduction,
        description
    ]);

    const newhackathon = {
      id: result.insertId,
      title,
      introduction,
      description
      
    };

    res.status(200).json(newhackathon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const edithackathon = async (req, res) => {
  try {
    const { id } = req.params;
    

    const { 
      title,
      introduction,
      description,
     } = req.body;

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
        description = ?
      WHERE id = ?
    `;

    
    await db.query(updatehackathonQuery, [
      title,
      introduction,
      description,
      id
    ]);

    res.json({
       id, 
       title,
       introduction,
       description
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  gethackathons,
  addhackathon,
  edithackathon
};
