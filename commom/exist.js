function isExist(arr, str) {
  for(let i = 0; i < arr.length; i++) {
    let patt = new RegExp(arr[i]);
    if (patt.test(str)) {
      return true;
    }
  }
  return false;
}

module.exports = {
  isExist
}
