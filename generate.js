var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
console.log(salt)