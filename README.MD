# Task Management Web App

This is a simple web application for managing tasks using Node.js and MySQL.

## Database Setup

To set up the MySQL database for this project, follow these steps:

1. Create a MySQL database named `task_manager`.

   ```sql
   CREATE DATABASE task_manager;

   USE task_manager;

   CREATE TABLE tasks (
   id INT AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   description TEXT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```
2. Node Setup
    
    Install modules and setup Tailwind + DaisyUI
    ```bash
    npm run setup
    ```
3. Run
    
    Run using Node
    ```
    node app.js
    ```