const user = require('./user');
const upload = require('./upload');

module.exports = app => {
  app.use('/user', user);
  app.use('/upload', upload);
}