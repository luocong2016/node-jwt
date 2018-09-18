const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require('./config');
const port = process.env.PORT || config.port;
const routers = require('./routes/index');
const { configurationMiddleware, tokenMiddleware } = require('./middlewares/serverMiddlewares')

/* configuration */
app.all('*', configurationMiddleware);

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
app.use(tokenMiddleware);

routers(app);

app.listen(port, () => { console.log(chalk.green(`成功监听端口：${port}`)); });
