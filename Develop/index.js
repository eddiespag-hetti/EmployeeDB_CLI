const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    // MySQL password
    password: "_3ddiE7689",
    database: "employeeTracker_db",
  },
  console.log(`Connected to the courses_db database.`)
);

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "view_options",
        message: "What would you like to do?",
        choices: [
          "View all Employees",
          "View all Departments",
          "View all Roles",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Quit",
        ],
      },
    ])

    .then((userChoice) => {
      console.log(userChoice);
      if (userChoice.view_options === "View all Employees") {
        viewALLEmp();
      }

      if (userChoice.view_options === "View all Departments") {
        viewAllDepartments();
      }

      if (userChoice.view_options === "View all Roles") {
        viewAllRoles();
      }

      if (userChoice.view_options === "Add Employee") {
        addEmployee();
      }
    });
};

const init = () => {
  promptUser();
};

// Functions for all user selections
const viewALLEmp = () => {
  db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    promptUser();
  });
};

const viewAllDepartments = () => {
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    promptUser();
  });
};

const viewAllRoles = () => {
  db.query(`SELECT * FROM role`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    promptUser();
  });
};

const addEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "firstname",
      message: "What is their first name?",
    },
    {
      type: "input",
      name: "lastname",
      message: "What is their last name?",
    },
    {
        type: "input",
        name: "what_role",
        message: "What is their current role?",
      },  
      {
        type: "input",
        name: "which_manager",
        message: "What is their current manager?",
      },  
    
  ]).then((answers) => {
    
  })
};

// Initilise Function()
init();
