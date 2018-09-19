const mimeTypes = require('mime-types');
const fs = require('fs');

function getMimeFunc(extname) {
  const mime = mimeTypes.lookup(extname);
  return mime ? mime.split('/')[0] : false;
}

function mkdirFile(extname, prefix = '') {
  const mimeType = getMimeFunc(extname);
  if (!mimeType) {
    return false;
  }
  try {
    fs.mkdirSync(prefix + mimeType);
  } catch (err) { }
  return true;
}

module.exports = {
  getMimeFunc,
  mkdirFile
}
