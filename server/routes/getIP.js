const express = require('express');
const os = require('os');
const router = express.Router();

router.get('/getIP', (req, res) => {
  try {
    const wifiIPv4 = Object.values(os.networkInterfaces()).flatMap(interfaceData =>
      interfaceData.find(item => item.family === 'IPv4' && !item.internal)?.address
    );
    const ip = `http://${wifiIPv4[0]}:8081`;
    res.status(200).json({ ip });
  } catch (error) {
    console.error('Error getting IP:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
