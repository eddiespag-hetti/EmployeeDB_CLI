DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
id INT NOT NULL PRIMARY KEY,
employee_name VARCHAR(30) NOT NULL
);



CREATE TABLE roles (
id INT NOT NULL PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL
department_id INT,
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY (role_id) REFERENCES roles(id),
FOREIGN KEY (manager_id) REFERENCES employee(id)
);