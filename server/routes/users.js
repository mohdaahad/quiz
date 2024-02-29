const express = require('express');
const router = express.Router();
const db = require('../database_layer/databaseSetup'); // Update the path accordingly

router.get('/users', (req, res) => {
  const sql = "SELECT users.*, classes.class_name FROM users JOIN classes ON users.class_id = classes.class_id";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      let rows = data.rows;
      let tableHtml = "<table id='customers'><thead><tr><th>ID</th><th>Username</th><th>Full Name</th><th>Father Name</th><th>Class</th><th>Email</th></tr></thead><tbody>";
      rows.forEach((row) => {
        tableHtml += `<tr><td>${row.user_id}</td><td>${row.username}</td><td>${row.full_name}</td><td>${row.father_name}</td><td>${row.class_name}</td><td>${row.email}</td></tr>`;
      });
      tableHtml += "</tbody></table>";
      let html = `<!DOCTYPE html><html><head><title>Users</title><style>#customers {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      
      #customers td, #customers th {
        border: 1px solid #ddd;
        padding: 8px;
      }
      
      #customers tr:nth-child(even){background-color: #f2f2f2;}
      
      #customers tr:hover {background-color: #ddd;}
      
      #customers th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #04AA6D;
        color: white;
      }</style></head><body>${tableHtml}</body></html>`;
      res.status(200).send(html);
    }
  });
});

module.exports = router;
