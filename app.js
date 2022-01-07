const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const indexRouter = require('./routes/index');
const formRouter = require('./routes/new');
const createError = require('http-errors');

const app = express();

// Handlebars Middleware
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage
app.use('/', indexRouter);
app.use('/new', formRouter);

// Handle errors
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  // set locals, only providing error in developmen
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render error page
  res.status(err.status || 500);
  res.render('error');
});

// when we deploy, server will have port number in env variable so check that first
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`working ${PORT}`));
