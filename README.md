# Task API

A RESTful API for managing tasks with authentication and authorization features. This project is built using Node.js and MongoDB, following a modular architecture to ensure scalability and maintainability. It serves as a sample project to demonstrate best practices in RESTful API development with JWT authentication.

## Purpose

The purpose of this project is to provide a sample API for a task management system. It implements CRUD operations (create, read, update, delete) for tasks and includes user authentication using JWT tokens. This project can be used as a base for other systems or as part of a portfolio.

## Features

- **User registration and login** with JWT authentication
- **CRUD operations** for tasks:
  - Create new task
  - List tasks
  - Update task
  - Delete task
- **User authorization** for accessing specific tasks
- **Route protection** using authentication middleware
- **Swagger documentation** for easy integration and testing

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for API development
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **jsonwebtoken** - Token generation and validation for JWT
- **bcryptjs** - Password hashing
- **helmet** - Adds security headers
- **express-validator** - Input data validation
- **cors** - Enables CORS for cross-origin requests

## Project Architecture

This project follows a modular architecture, known as **Model-Routes-Controller (MRC)**, which promotes clear separation of responsibilities and facilitates maintenance and scalability.

### Folder Structure

```plaintext
task-api/
├── config/                   # General project configuration
│   └── db.js                 # Database connection
├── controllers/              # API operation logic
│   ├── taskController.js     # Task controller
│   └── userController.js     # User controller
├── models/                   # Data models
│   ├── Task.js               # Task model
│   └── User.js               # User model
├── middlewares/              # Middleware for validation and authentication
│   └── auth.js               # JWT authentication middleware
├── routes/                   # API route definitions
│   ├── taskRoutes.js         # Task-related routes
│   └── userRoutes.js         # User-related routes
├── tests/                    # Unit and integration tests
│   ├── task.test.js          # Task tests
│   └── user.test.js          # User tests
├── utils/                    # Utility functions and helpers
│   └── logger.js             # Custom logger function (optional)
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
├── app.js                    # Express server setup and configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```` 

### Folder Descriptions
* config/: Contains general project configuration, like database setup.
* controllers/: Functions to handle HTTP request logic.
* models/: Data models defined for API, such as Task and User, used by MongoDB.
* middlewares/: Middleware functions for request validation and authentication.
* routes/: API route files, defining endpoints and mapping them to controllers.
* tests/: Unit and integration tests to ensure endpoints function correctly.
* utils/: Utility functions, such as a logger, that can be used throughout the project.

### Setup and Usage
#### Prerequisites
1. Node.js
2. MongoDB (local or MongoDB Atlas)
3. Postman or similar to test endpoints

#### Installation Steps
1. Clone the repository:
````Bash
git clone https://github.com/cleosilva/api-taks.git
cd task-api
````

2. Install dependencies:
````Bash
npm install
````
3. Set up the .env file:
````Bash
PORT=3000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_secret_key
````

4. Start the server:
````Bash
npm start
````

### Testing

To run test:
````bash
npm test
````

### Endpoints

#### Authentication
* POST /api/users/register - Registers a new user
* POST /api/users/login - Authenticates a user and returns a JWT token

#### Tasks
* POST /api/tasks - Creates a new task (authenticated)
* GET /api/tasks - Retrieves all tasks for the authenticated user
* PUT /api/tasks/ - Updates a task (authenticated)
* DELETE /api/tasks/ - Deletes a task (authenticated)

### Contribution
Contributions are welcome! Feel free to open a pull request or report an issue.

### License
This project is licensed under the MIT License.



