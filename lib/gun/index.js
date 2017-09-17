const config = require('config');
const Gun = require('gun');

module.exports = (opts) => {
  var gun = Gun(Object.assign(config.gun, opts, {
    //file: 'data.json',
    //s3: {
      //key: '', // AWS Access Key
      //secret: '', // AWS Secret Token
      //bucket: '', // The bucket you want to save into
      //prefix: 'gun/'
    //}
  }));
  return gun;
};
