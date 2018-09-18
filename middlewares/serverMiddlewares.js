const jwt = require('jsonwebtoken');

const config = require('../config');
const { isExist } = require('../commom/exist');

const configurationMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.Origin || req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,x-access-token');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true); // 可以带cookies
  res.header('X-Powered-By', '3.2.1');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

const tokenMiddleware = (req, res, next) => {
  const { path = '' } = req;
  if (config.unless.indexOf(path) !== -1 || isExist(config.nonToken, path)) { // if path include '/user/', return
    next();
    return;
  }
  
  const token = req.headers['x-access-token'] || req.body.token || req.query.token;
  if (token) { // verifies secret and checks exp
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
}

module.exports = {
  configurationMiddleware,
  tokenMiddleware
};
