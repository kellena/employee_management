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

function addEmp () {
    runPrompt = require('../index')
    db.query('SELECT * FROM employee INNER JOIN emp_role ON employee.role_id = emp_role.id GROUP BY emp_role.title', (err, res)=>{
        inquirer.prompt([
            {
                type: 'list',
                name: 'empId',
                message: 'What is the role of your new employee?',
                choices: res.map(role=>role.title)
            },
            {
                type: 'input',
                name: 'firstName',
                message: "What is your employee's first name?",
            },
            {
                type: 'input',
                name: "lastName",
                message: "What is your employee's last name?"
            },
            {
                type: 'list',
                name: "empManager",
                message: "Who is your employees manager?",
                choices: res.map(role=>role.first_name + " " + role.last_name).slice(0,2)
            },

        ]).then(response=>{

            const selectedTitle = res.find(role=>role.title === response.empId)
            const selectedManager = res.find(role=>role.first_name + " " + role.last_name === response.empManager)

            db.query('INSERT INTO employee SET ?', {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: selectedTitle.id,
                manager_id: selectedManager.manager_id
            })

            console.log('New employee added!')
            runPrompt();

        })

    })
    
}

function updateRole () {
    runPrompt = require('../index')

    db.query("SELECT * FROM employee", (err, resultsEmp) => {
        if (err) throw err;
        const updateEmployeeRole = []
        resultsEmp.forEach(({ first_name, last_name, id }) => {
            updateEmployeeRole.push({
                name: first_name + " " + last_name,    
                value: id            
            })
        })
    });        
    

    db.query("SELECT * FROM emp_role", (err, resultsRole) => {
        if (err) throw err;
        const updateRole = []
        resultsRole.forEach(({ title, id }) => {
            updateRole.push({
                name: title,
                value: id
            })
        })
    });
    
    let questions = [
        {
            type: 'list',
            name: 'updateEmployeeChoice',
            message: "Which employee would you like to update?",
            choices: updateEmployeeRole
        },
        {
            type: 'list',
            name: 'updateRoleChoice',
            message: "Which role would you like to give the employee?",
            choices: updateRole
        },
    ]

    inquirer.prompt(questions)
    .then(answer => {
        const update = 'UPDATE employee SET ? WHERE ?? = ?';
        db.query(update, [
            {role_id: answer.updateRoleChoice},
                "id", answer.updateEmployeeChoice                 
            
        ], (err, results) => {
            if (err) throw err;
            console.log('Employee role has been updated!')
            runPrompt();
        });
    });
};


function finished () {
    console.log("Finished!")
    process.exit()
}


module.exports = { allDepts, allRoles, allEmps, addDept, addRole, addEmp, updateRole, finished }