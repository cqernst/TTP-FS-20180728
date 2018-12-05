const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db');
const session = require('express-session');
const passport = require('passport');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'Fedya was here',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

app.use('/api', require('./apiRoutes'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000;

async function start() {
  await db.sync({ force: true }); // sync our database
  app.listen(port, function() {
    console.log(`Listening on port ${port}`);
  });
}

start();
