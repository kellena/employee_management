const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'kellena',
        password: 'Shinji416',
        database: 'employee_management_db';
    },
    console.log(`Connected to the database.`)
);

module.exports = db;