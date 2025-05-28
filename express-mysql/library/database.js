let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Enter your MySQL root password here if you have one
    database: 'db_xirpl_16' // This database name will be created in the next step
});

connection.connect(function(error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Koneksi Berhasil!');
    }
});

module.exports = connection;