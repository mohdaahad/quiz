const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    } else {
      return res.status(200).json({ message: 'Logout successful' });
    }
  });
});

module.exports = router;
