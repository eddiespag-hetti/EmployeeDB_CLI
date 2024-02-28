DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
id INT NOT NULL PRIMARY KEY,
name VARCHAR(30) NOT NULL
);



CREATE TABLE roles (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT DEFAULT 0,
FOREIGN KEY (department_id) REFERENCES department(id)
ON DELETE SET NULL
);

CREATE TABLE employees (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT DEFAULT 0, 
FOREIGN KEY (role_id) REFERENCES roles(id),
FOREIGN KEY (manager_id) REFERENCES employees(id)
ON DELETE SET NULL
);