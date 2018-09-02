const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

const userSchema = new Schema({
  user: String,
  password: String,
  status: Number,
  create_time: { type: Date, default: moment().format('YYYY-MM-DD HH:mm:ss') },
  avatar: { type: String, default: 'default.jpg' }
});

userSchema.index({ id: 1 });

module.exports = mongoose.model('User', userSchema);