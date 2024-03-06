const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const dataFilePath = path.join(__dirname, 'form_data.json');

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/custom-order-form', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.post('/api/submit-order', (req, res) => {
  const formData = req.body;

  try {
    let existingData = [];
    if (fs.existsSync(dataFilePath)) {
      existingData = JSON.parse(fs.readFileSync(dataFilePath));
    }

    existingData.push(formData);

    fs.writeFileSync(dataFilePath, JSON.stringify(existingData));

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
