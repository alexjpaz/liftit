const Gun = require('gun');
require('gun-level');

module.exports = (gunOpts) => {
    return Gun(gunOpts);
};
