const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();

// Handlebars Middleware
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) => res.render('index'));

// // Set views as static folder
// app.use(express.static(path.join(__dirname, 'views')));

// Messages API Routes
app.use('/api/messages', require('./routes/api/messages'));

// when we deploy, server will have port number in env variable so check that first
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`working ${PORT}`));
