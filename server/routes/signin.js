const express = require('express');
const router = express.Router();
const db = require('../database_layer/databaseSetup');

router.post('/sign-in', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const selectQuery = "SELECT * FROM users WHERE username = $1 AND password = $2";

  db.query(selectQuery, [username, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.rowCount > 0) {
        req.session.username = result.rows[0].username;
        req.session.email = result.rows[0].email;
        req.session.fathername = result.rows[0].father_name;
        req.session.id = result.rows[0].user_id;
        req.session.fullname = result.rows[0].full_name;
        req.session.class = result.rows[0].class_id;
        return res.status(200).send(result);
      } else {
        return res.status(401).json({ message: 'WRONG USERNAME OR PASSWORD' });
      }
    }
  });
});

module.exports = router;
