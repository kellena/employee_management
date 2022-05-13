const db = require('./connection')
const inquirer = require('inquirer')

let runPrompt;

function allDepts() {
    runPrompt = require('../index')
    db.query('SELECT * FROM emp_department', function (err, results) {
        console.table(results);
        runPrompt();
    });
}

function allRoles() {
    runPrompt = require('../index')
    db.query('SELECT * FROM emp_role', function (err, results) {
        console.table(results);
        runPrompt();
    });
}

function allEmps() {
    runPrompt = require('../index')
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        runPrompt();
    });
}

function addDept() {}

function addRole() {}

function addEmp () {}

function updateRole () {}

function finished () {}


module.exports = {
    allDepts, allRoles, allEmps, addDept, addRole, addEmp, updateRole, finished
}