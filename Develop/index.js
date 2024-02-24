const inquirer = require('inquirer');



const promptUser = () => {
    return inquirer.prompt([
{
    type: 'list',
    name: 'view_options',
    message: 'What would you like to do?',
    choices: 
    ['View all Employees', 'View all Employees by Department', 'View all Employees by Manager', 'Add Employee', 
    'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'View all Departments', 'Add Department',
'Remove Department', 'Quit']
    
}

    ])}

    const init = () => {
        promptUser();
    }

    init();