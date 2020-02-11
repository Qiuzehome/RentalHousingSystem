var mysql = require('mysql');
exports.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'house'
});