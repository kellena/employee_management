const inquirer = require ('inquirer');
const db = require('./db/connection')

require('dotenv').config();
const { allDepts, allRoles, allEmps, addEmp, addDept, addRole, updateRole, finished} = require('./db/server')
db.connect(function(err){
    if (err) throw err
    runPrompt()
})

