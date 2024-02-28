// Requiring neccesary libraries
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

// npm figlet for rendering logo in CLI
const figlet = require("figlet");

function renderFiglet(callback) {
  figlet("Employee Tracker DB", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
    callback();
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////

// Create a connection to the Database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "_3ddiE7689",
    database: "employeeTracker_db",
  },
  console.log(`Connected to the Employee Tracker DB database.`)
);

////////////////////////////////////////////////////////////////////////////////////////////////

// Displays main ment questions to recieve user input
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
}

////////////////////////////////////////////////////////////////////////////////////////////////

function insertEmployee(employeeData) {
  db.query(
    `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
    [
      employeeData.first_name,
      employeeData.last_name,
      employeeData.role_id,
      employeeData.manager_id,
    ],
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
  db.query(`SELECT * FROM roles`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    promptUser();
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////

function addEmployee() {
  db.query(`SELECT id, title FROM roles`, (err, roles) => {
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

function addRole() {
  db.query(`SELECT id, name FROM department`, (err, department) => {
    if (err) {
      console.log(err);
      return;
    }
    
    const departmentChoices = department.map((department) => ({
      name: department.name,
      value: department.id,
    }));
    promptGetRoleDetails(departmentChoices);
  });
    
  function promptGetRoleDetails(departmentChoices) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is their yearly salary?",
        },
        {
          type: "list",
          name: "department",
          message: "Which department will hold the role?",
          choices: departmentChoices,
        },
      ])
      .then((answers) => {
        // Once user input is recieved - insert into roles functions is called
        insertRole(answers);
      })
      .catch((error) => {
        console.log("An error has occured:", error);
      });
  }

  function insertRole(roleData) {
    db.query(
      `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?, ?)`
    
      [roleData.title, roleData.salary, roleData.department_id],
      (err, result) => {
        if (err) {
          console.log("There was an error adding role:", err);
        } else {
          console.log("Role successfully added!");
        }
      }
  )}

}
////////////////////////////////////////////////////////////////////////////////////////////////

function quitApplication() {
  console.log("Exiting the application..");
  process.exit(0); // Exit the process with 'process.exit(0)' '0' as a success status code
}

////////////////////////////////////////////////////////////////////////////////////////////////

// Initilise Function()
init();
