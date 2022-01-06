const express = require('express');
const path = require('path');
const app = express();

// Set views as static folder
app.use(express.static(path.join(__dirname, 'views')));

// when we deploy, server will have port number in env variable so check that first
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`working ${PORT}`));
