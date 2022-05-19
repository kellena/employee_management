const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Shinji416',
        database: 'employee_db'
    },
    console.log(`Connected to the database.`)
);

module.exports = db;