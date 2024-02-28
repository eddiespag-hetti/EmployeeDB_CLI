const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

const figlet = require("figlet");

function renderFiglet(callback) {
  figlet("Employee DB", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
    callback();
  });
}


const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    // MySQL password
    password: "_3ddiE7689",
    database: "employeeTracker_db",
  },
  console.log(`Connected to the Employee Tracker DB database.`)
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

function init() {
  renderFiglet(promptUser);
};

////////////////////////////////////////////////////////////////////////////////////////////////



function insertEmployee(employeeData) {
  db.query(
    `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
    [employeeData.first_name, employeeData.last_name, employeeData.role_id, employeeData.manager_id],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log("Employee added successfully!");
      promptUser(); // Continue interaction
    }
  );
}





////////////////////////////////////////////////////////////////////////////////////////////////

// Functions for all user selections
const viewALLEmp = () => {
  db.query(`SELECT * FROM employees`, (err, result) => {
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
  db.query(`SELECT id, title FROM role`, (err, roles) => {
    if (err) {
      console.log(err);
      return;
    }

    // Extract the relevant role titles from the result to use in inquirer 'choices'
    const roleChoices = roles.map(role => ({
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

    ///////// Need to correct this query string //////////////////////////
    `SELECT DISTINCT id, first_name, last_name FROM employees WHERE manager_id IS NULL`,
    (err, managers) => {
      // Error handler
      if (err) {
        console.log(err);
        return;
      }
      const managerChoices = managers.map((manager) => ({
        name: `${manager.first_name} ${manager.last_name}`,
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
        name: "first_name",
        message: "What is their first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is their last name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is their current role?",
        choices: roleChoices,
      },
      {
        type: "list",
        name: "manager_id",
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
