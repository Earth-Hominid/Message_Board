const express = require('express');

const app = express();

// when we deploy, server will have port number in env variable so check that first
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`working ${PORT}`));
