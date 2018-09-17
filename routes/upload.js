const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const moment = require('moment');

const config = require('../config');
const urlPath = '/img/'
const imgPath = './public' + urlPath;

router.post('/', function (req, res, next) {
  const form = new formidable.IncomingForm();
  form.uploadDir = imgPath;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      fs.unlinkSync(files.file.path);
      res.send({ status: 0, type: 'ERROR_File', message: '上传文件错误' });
      return;
    }

    const extname = path.extname(files.file.name);
    if (!config.extname.includes(extname)) {
      fs.unlinkSync(files.file.path);
      res.send({ status: 0, type: 'ERROR_EXTNAME', message: '文件格式错误' });
      return;
    }

    const hashName = (moment().format('YYYYMMDDHHmmss') + Math.ceil(Math.random() * 10000)).toString(16);
    const fullName = hashName + extname;
    const newpath = imgPath + fullName;

    fs.rename(files.file.path, newpath, function (err) {
      if (err) {
        fs.unlinkSync(files.file.path);
        res.send({ status: 0, type: 'ERROR_File', message: '上传文件错误' });
      }
    });

    res.send({ status: 1, data: urlPath + fullName, message: '上传成功' });
  });
});

module.exports = router;
