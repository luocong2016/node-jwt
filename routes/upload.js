const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const moment = require('moment');

const config = require('../config');
const { getMimeFunc, mkdirFile } = require('../commom/mime');
const tempFile = './public/temporary';

function delUpload(res, files, obj) {
  fs.unlinkSync(files.file.path);
  res.send(obj);
}

try {
  fs.mkdirSync(tempFile);
} catch (err) { }

router.post('/', function (req, res, next) {

  const form = new formidable.IncomingForm();

  form.uploadDir = tempFile; // temporary storage of documents

  form.parse(req, async (err, fields, files) => {
    if (err) {
      delUpload(res, files, { status: 0, type: 'ERROR_File', message: '上传文件错误' });
      return;
    }

    const extname = path.extname(files.file.name);

    if (!config.extname.includes(extname)) { // 文件格式限制
      delUpload(res, files, { status: 0, type: 'ERROR_EXTNAME', message: '文件格式错误' });
      return;
    }

    if (!mkdirFile(extname, './public/')) { // 文件存放文件夹
      delUpload(res, files, { status: 0, type: 'ERROR_EXTNAME', message: '文件路径错误' });
      return;
    }

    const hashName = (moment().format('YYYYMMDDHHmmss') + Math.ceil(Math.random() * 10000)).toString(16);
    const fileName = getMimeFunc(extname);
    const newpath = `./public/${fileName}/${hashName + extname}`;

    try {
      fs.rename(files.file.path, newpath, err => {
        if (err) {
          delUpload(res, files, { status: 0, type: 'ERROR_File', message: '上传文件中出现错误' });
        }
      });
      res.send({ status: 1, data: `/${fileName}/${hashName + extname}`, message: '上传成功' });
    } catch (err) {
      delUpload(res, files, { status: 0, type: 'ERROR_UNKNOWN', message: err.message });
    }
  });
});

module.exports = router;
