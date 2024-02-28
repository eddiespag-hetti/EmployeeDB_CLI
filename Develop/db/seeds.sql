INSERT INTO department (id, name)
VALUES 
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Human Resources'),
(4, 'Finance'),
(5, 'Information Technology'),
(6, 'Customer Service'),
(7, 'Research and Development'),
(8, 'Operations'),
(9, 'Legal'),
(10, 'Administration');

INSERT INTO roles (id, title, salary, department_id)
VALUES
(1, 'Sales Associate', 50000, 1),
(2, 'Marketing Specialist', 60000, 2),
(3, 'HR Manager', 70000, 3),
(4, 'Financial Analyst', 65000, 4),
(5, 'IT Specialist', 70000, 5),
(6, 'Customer Service', 45000, 6),
(7, 'Research Scientist', 80000, 7),
(8, 'Operations Manager', 75000, 8),
(9, 'Legal Counsel', 90000, 9),
(10, 'Administrative Assistant', 40000, 10);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id) 
VALUES
(1, 'John', 'Doe', 1, NULL),
(2, 'Jane', 'Smith', 2, NULL),
(3, 'Michael', 'Johnson', 3, NULL),
(4, 'Emily', 'Williams', 4, 3),
(5, 'David', 'Brown', 5, 3),
(6, 'Sarah', 'Davis', 6, 3),
(7, 'Daniel', 'Miller', 7, 6),
(8, 'Emma', 'Wilson', 8, 6),
(9, 'Matthew', 'Taylor', 9, 6),
(10, 'Olivia', 'Moore', 10, 6),
(11, 'William', 'Anderson', 1, 1),
(12, 'Sophia', 'Martinez', 2, 2),
(13, 'James', 'Garcia', 3, 3),
(14, 'Charlotte', 'Hernandez', 4, 3),
(15, 'Benjamin', 'Lopez', 5, 3),
(16, 'Amelia', 'Young', 6, 3),
(17, 'Ethan', 'Scott', 7, 6),
(18, 'Evelyn', 'Clark', 8, 6),
(19, 'Alexander', 'King', 9, 6),
(20, 'Avery', 'Lee', 10, 6);