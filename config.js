module.exports = {
  port: 8089,
  secret: 'lutz',
  database: 'mongodb://localhost:27017/jwt',
  unless: [ // Unwanted token
    '/user/login',
    '/user/append'
  ],
  nonToken: [ // Unwanted token RegExp
    '^/img/'
  ],
  extname: [
    '.jpg', '.jpeg', '.png'
  ]
};
