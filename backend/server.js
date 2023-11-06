const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const results = [];

fs.createReadStream(path.join(__dirname, '../data.csv'))
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log('CSV file successfully processed.');
  });

app.get('/search', (req, res) => {
  const { id } = req.query;
  const profile = results.find((item) => item.id === id);

  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ message: 'Profile not found' });
  }
});

// Serve the 'index.html' file directly from the 'frontend' directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
