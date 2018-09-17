module.exports = {
  port: 8089,
  secret: 'lutz',
  database: 'mongodb://localhost:27017/jwt',
  unless: [
    '/user/login',
    '/user/append'
  ],
  extname: [
    '.jpg', '.jpeg', '.png'
  ]
};
