const express = require('express');
const router = express.Router();
const db = require('../database_layer/databaseSetup'); // Update the path accordingly

router.post('/sign-up', async (req, res) => {
  try {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const fathername = req.body.fathername;
    const fullname = req.body.fullname;
    const dob = req.body.dob;
    const address = req.body.address;
    const class_ = req.body.class;

    const insertQuery = `
      INSERT INTO users (email, username, password, father_name, full_name, class_id, dob, address)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    
    db.query(insertQuery, [email, username, password, fathername, fullname, class_, dob, address], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      } else {
        req.session.username = username;
        req.session.email = email;
        req.session.fathername = fathername;
        req.session.fullname = fullname;
        req.session.class = class_;
        return res.status(200).send(result);
      }
    });
  } catch (error) {
    console.error('Error in sign-up:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
