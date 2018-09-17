const UserModel = require('../../models/user/user');
const { encryption } = require('../../commom/password');
const jwt = require('jsonwebtoken');
const config = require('../../config');

function getToken(obj) {
  // secret variable
  return jwt.sign(obj, config.secret);
}

class User {
  constructor() { }

  async login(req, res, next) {
    const { user, password } = req.body;
    if (!user || !password) {
      res.send({ status: 0, type: 'ERROR_PARAM', message: '账号或密码不能为空' });
      return;
    }
    const newpassword = encryption(password);
    try {
      const userData = await UserModel.findOne({ user });

      if (!userData) {
        res.send({ status: 0, type: 'ERROR_FETCH', message: '该用户不存在' });
      } else if (newpassword.toString() != userData.password.toString()) {
        res.send({ status: 0, type: 'ERROR_PARAM', message: '账号或密码错误' });
      } else {
        res.send({ status: 1, token: getToken({ user }), message: '登录成功' });
      }
    } catch (err) {
      res.send({ status: 0, type: 'ERROR_UNKNOWN', message: err.message });
    }
  }

  async append(req, res, next) {
    const { user, password } = req.body;
    if (!user || !password) {
      res.send({ status: 0, type: 'ERROR_PARAM', message: '账号或密码不能为空' });
      return;
    }
    const newpassword = encryption(password);
    try {
      const userData = await UserModel.findOne({ user });
      if (userData) {
        res.send({ status: 0, type: 'ERROR_FETCH', message: '该用户已存在' });
        return;
      }
      const newUser = { user, password: newpassword, status: 1 };
      await UserModel.create(newUser);
      res.send({ status: 1, token: getToken({ user }), message: '注册用户成功' })
    } catch (err) {
      res.send({ status: 0, type: 'ERROR_UNKNOWN', message: err.message });
    }

  }

  async updateAvatar(req, res, next) {
    const { avatar = 'default.jpg' } = req.body;
    const { user } = req.decoded;
    try {
      await UserModel.update({ user }, { $set: { avatar } });
      res.send({ status: 1, data: avatar, message: '修改成功' });
    } catch (err) {
      res.send({ status: 0, type: 'ERROR_UNKNOWN', message: err.message });
    }
  }
}

module.exports = new User();
