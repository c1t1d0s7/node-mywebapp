const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config/config');

const hostnameRouter = require('./routes/hostnameRouter');
const podDetailsRouter = require('./routes/podDetailsRouter');
const healthCheckRouter = require('./routes/healthCheckRouter');
const killRouter = require('./routes/killRouter');
const loadGenerateRouter = require('./routes/loadGenerateRouter');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Cookie parser
// const cookieParser = require('cookie-parser');
// app.use(cookieParser(process.env.COOKIE_SECRET));

// Session
// const session = require('express-session');
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
// }));

app.use('/', hostnameRouter);
app.use('/hostname', hostnameRouter);
app.use('/poddetails', podDetailsRouter);
app.use('/healthcheck', healthCheckRouter);
app.use('/kill', killRouter);
app.use('/load', loadGenerateRouter);

app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
})
