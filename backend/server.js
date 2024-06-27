// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let data = [
  { id: 1, quantity: 100, amount: 100, postingYear: 2020, postingMonth: 'January', actionType: 'Type1', actionNumber: '001', actionName: 'Action1', status: 'Pending' },
  { id: 1, quantity: 10, amount: 100, postingYear: 2020, postingMonth: 'January', actionType: 'Type1', actionNumber: '001', actionName: 'Action1', status: 'Pending' },
  { id: 1, quantity: 120, amount: 100, postingYear: 2020, postingMonth: 'January', actionType: 'Type1', actionNumber: '001', actionName: 'Action1', status: 'Pending' },
  { id: 1, quantity: 132, amount: 100, postingYear: 2020, postingMonth: 'January', actionType: 'Type1', actionNumber: '001', actionName: 'Action1', status: 'Pending' },
  { id: 1, quantity: 10, amount: 100, postingYear: 2020, postingMonth: 'January', actionType: 'Type1', actionNumber: '001', actionName: 'Action1', status: 'Pending' },
];

app.get('/data', (req, res) => {
  res.json(data);
});

app.put('/data/:id', (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  console.log(`Received update for item ${id}:`, updatedItem);
  data = data.map(item => item.id === parseInt(id) ? { ...item, ...updatedItem } : item);
  res.json({ message: 'Data updated successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
