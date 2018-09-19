const express = require('express');
const app = express();
const compression = require('compression')
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
mongoose.connect(config.database, config.dataOpt);

// secret variable
// app.set('superSecret', config.secret);

// use gzip | ungzip, see doc/nginx.md
app.use(compression());

// use body parser so we can get info from POST and/or URL parameters
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// route middleware to verify a token
app.use(tokenMiddleware);

/* routes */
routers(app);

app.listen(port, () => { console.log(chalk.green(`成功监听端口：${port}`)); });
