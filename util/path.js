const path = require('path');
console.log(path.join(path.resolve(), 'images'));

module.exports = path.dirname(process.mainModule.filename);