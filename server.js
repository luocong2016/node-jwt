// get the packages we need
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const chalk = require('chalk');
const config = require('./config');
const port = process.env.PORT || config.port;
const routers = require('./routes/index');

/* configuration */
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.Origin || req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true); // 可以带cookies
  res.header('X-Powered-By', '3.2.1');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// connect to database
mongoose.connect(config.database);

// secret variable
// app.set('superSecret', config.secret);

// use body parser so we can get info from POST and/or URL parameters
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* routes */
// use morgan to log requests to the console
app.use(morgan('dev'));

// route middleware to verify a token
app.use(function (req, res, next) {
  const { path = '' } = req;
  if (config.unless.indexOf(path) !== -1) { // if path include '/user/', return
    next();
    return;
  }
  
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {// verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({ status: 0, type: 'ERROR_TOKEN', message: '获取token错误' });
      } else { // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else { // if there is no token, return an error
    return res.status(401).send({ status: 0, type: 'ERROR_TOKEN', message: '获取token错误' });
  }
});

routers(app);

app.listen(port, () => { console.log(chalk.green(`成功监听端口：${port}`)); });
