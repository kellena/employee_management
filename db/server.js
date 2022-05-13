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

function addDept() {
    runPrompt = require('../index')
    inquirer.prompt ([
        {
            type: 'input',
            name: 'addDept',
            message: "What is the name of the department you would like to add?"

        }
    ]).then(response =>{
        db.query('INSERT INTO emp_department SET ?', {
            name: response.addDept
        })
        runPrompt();
    })
}

function addRole() {
    runPrompt = require('../index')
    db.query('SELECT * FROM emp_department', (err, res)=>{
        inquirer.prompt([
            {
                type: 'list',
                name: 'deptId',
                message: 'What department is your new role in?',
                choices: res.map(department=>department.name)
            },
            {
                type: 'input',
                name: 'addSalary',
                message: "What is the salary of your new role?",
            },
            {
                type: 'input',
                name: "addTitle",
                message: "What is the title of your new role?"
            }
        ]).then(response=>{
            const selectedDept = res.find(department=>department.name === response.deptId)
            db.query('INSERT INTO emp_role SET ?', {
                salary: response.addSalary,
                title: response.addTitle,
                department_id: selectedDept.id
            })
            console.log('New role added!')
            runPrompt();
        })
    })
}

function addEmp () {}

function updateRole () {}

function finished () {
    console.log("Finished!")
    process.exit()
}


module.exports = { allDepts, allRoles, allEmps, addDept, addRole, addEmp, updateRole, finished }