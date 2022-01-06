const express = require('express');
const path = require('path');

const app = express();

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// Set views as static folder
app.use(express.static(path.join(__dirname, 'views')));

// when we deploy, server will have port number in env variable so check that first
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`working ${PORT}`));
