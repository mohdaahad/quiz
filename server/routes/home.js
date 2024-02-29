const express = require('express');
const router = express.Router();
const db = require('../database_layer/databaseSetup');

router.get("/valid", (req, res) => {
  if (req.session.username) {
    db.query(
      "SELECT * FROM users WHERE username = $1 AND email = $2 AND father_name = $3",
      [req.session.username, req.session.email, req.session.fathername],
      (err, result) => {
        if (err) {
          console.log('Error in query:', err);
          return res.json({ valid: false });
        } else {
          if (result.rows.length === 0) {
            return res.json({ valid: false });
          } else {
            const user = result.rows[0];
            return res.json({
              valid: true,
              id: user.user_id,
              username: user.username,
              fathername: user.father_name,
              email: user.email,
              fullname: user.full_name,
              quiz: req.session.quiz
            });
          }
        }
      }
    );
  } else {
    return res.json({ valid: false });
  }
});

  
module.exports = router;