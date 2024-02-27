const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");
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

////////////////////////////////////////////////////////////////////////////////////////////////

const promptUser = () => {
  return (
    inquirer
      .prompt([
        {
          type: "list",
          name: "view_options",
          message: "What would you like to do?",
          choices: [
            "View all Employees",
            "View all Departments",
            "View all Roles",
            "Add Employee",
            "Add Role",
            "Add Department",
            "Update Employee Role",
            "Quit",
          ],
        },
      ])
      // .then() for handling all user selections that call related functions
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

        if (userChoice.view_options === "Add Role") {
          addRole();
        }

        if (userChoice.view_options === "Add Department") {
          addDepartment();
        }

        if (userChoice.view_options === "Add Employee Role") {
          addEmployeeRole();
        }

        if (userChoice.view_options === "Quit") {
          quitApplication();
        }
      })
  );
};

const init = () => {
  promptUser();
};

////////////////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////////////

function addEmployee() {
  db.query(`SELECT id, title FROM role`, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    // Extract the relevant role titles from the result to use in inquirer 'choices'
    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    // Get managers once the roles are fetched
    getManagers(roleChoices);
  });
}

function getManagers(roleChoices) {
  // Query db to get available managers
  db.query(
    `SELECT id, CONCAT(first_name, ' ', last_name) AS manager FROM employee`,
    (err, managers) => {
      // Error handler
      if (err) {
        console.log(err);
        return;
      }
      const managerChoices = managers.map((manager) => ({
        name: manager.manager,
        value: manager.id,
      }));

      promptEmployeeDetails(roleChoices, managerChoices);
    }
  );
}

function promptEmployeeDetails(roleChoices, managerChoices) {
  inquirer
    .prompt([
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
        type: "list",
        name: "what_role",
        message: "What is their current role?",
        choices: roleChoices,
      },
      {
        type: "list",
        name: "which_manager",
        message: "Who is their current manager?",
        choices: managerChoices,
      },
    ])
    .then((answers) => {
      // Once user input is received, insert the new entry into the database
      insertEmployee(answers);
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////

// Initilise Function()
init();
