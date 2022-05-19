const inquirer = require ('inquirer');
const db = require('./db/connection')

require('dotenv').config();

const { allDepts, allRoles, allEmps, addDept, addRole, addEmp, updateRole, finished} = require('./db/server')

db.connect(function(err){
    if (err) throw err
    runPrompt()
})

let options = ["allDepts", "allRoles", "allEmps", "addDept", "addRole", "addEmp", "updateRole", "finished"]

function runPrompt () {

    inquirer.prompt([

        {type:"list",
         name: "options",
         message: "What would you like to do?",
         choices: options
        },

    ])

    .then ((answer) => {

        console.log(answer);

        switch (answer.options) {
            case options[0]:
                allDepts();
                break;
            case options[1]:
                allRoles();
                break;
            case options[2]:
                allEmps();
                break;   
            case options[3]:
                addDept();
                break;
            case options[4]:
                addRole();
                break;
            case options[5]:
                addEmp();
                break;
            case options[6]:
                updateRole();
                break;
            case options[7]:
                finished();
                break;
                
        }

    }) 

}


module.exports = runPrompt