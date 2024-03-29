const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const dataFilePath = path.join(__dirname, 'form_data.json');

// Adjust the PostgreSQL connection string
const connectionString = process.env.DATABASE_URL ?
    process.env.DATABASE_URL.replace('postgres://', 'postgresql://') :
    'postgresql://postgres:postgres@localhost:5432/mg_landingpage';


    console.log("connectionString: ", connectionString)
const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/custom-order-form', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.post('/api/submit-order', async (req, res) => {
  const formData = req.body;

  console.log("IN post-api-submit-order -- formData: ", formData);

  try {
    const client = await pool.connect();
    const query = 'INSERT INTO orders (subject, age_group, skill_level) VALUES ($1, $2, $3)';
    const values = [formData.subject, formData.ageGroup, formData.skillLevel];
    await client.query(query, values);
    client.release();

    console.log('Form data saved successfully:', formData);

    res.json({ success: true });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Failed to save form data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});