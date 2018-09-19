module.exports = {
  port: 8089,
  secret: 'lutz',
  database: 'mongodb://localhost:27017/jwt',
  dataOpt: {
    useNewUrlParser: true
  },
  unless: [ // Unwanted token
    '/user/login',
    '/user/append'
  ],
  nonToken: [ // Unwanted token RegExp
    '^/image/',
    '^/application/'
  ],
  extname: [
    '.jpg', '.jpeg', '.png', 'gif',
    '.doc', '.docx',
    '.xls', '.xlsx'
  ]
};
