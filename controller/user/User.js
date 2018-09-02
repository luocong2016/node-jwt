const UserModel = require('../../models/user/user');
const { encryption } = require('../../commom/password');
const jwt = require('jsonwebtoken');
const config = require('../../config');

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
        // secret variable
        const token = jwt.sign({ user }, config.secret);

        // verify a token symmetric
        // const decoded = jwt.verify(token, config.secret);
        // console.log(decoded);

        res.send({ status: 1, token, message: '登录成功' });
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

      res.send({ status: 1, message: '注册用户成功' })

    } catch (err) {
      res.send({ status: 0, type: 'ERROR_UNKNOWN', message: err.message });
    }

  }
}

module.exports = new User();
