# Notes API

A RESTful API for managing notes with authentication and authorization features. This project is built using Node.js, Express, MongoDB, and follows a modular architecture to ensure scalability and maintainability. It serves as a sample project to demonstrate best practices in RESTful API development with JWT authentication.

## Purpose

The purpose of this project is to provide a sample API for a note-taking system, similar to Google Keep. It implements CRUD operations (create, read, update, delete) for notes and includes user authentication using JWT tokens. This project can be used as a base for other systems or as part of a portfolio.

## Features

* **User registration and login** with JWT authentication
* **CRUD operations** for notes:
  * Create new note
  * List all notes
  * Update note (including features like pinning, color change, and archiving)
  * Delete note
* **User authorization** for accessing specific notes
* **Route protection** using authentication middleware
* **Swagger documentation** for easy integration and testing
* **Real-time notifications** using WebSockets for note reminders

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
- **websocket** - For real-time notifications

## Project Architecture

This project follows a modular architecture, known as **Model-Routes-Controller (MRC)**, which promotes clear separation of responsibilities and facilitates maintenance and scalability.

### Folder Structure

```plaintext
notes-api/
├── config/                   # General project configuration
│   └── db.js                 # Database connection
├── controllers/              # API operation logic
│   ├── noteController.js     # Note controller (manage notes)
│   └── userController.js     # User controller (manage users)
├── models/                   # Data models
│   ├── Note.js               # Note model
│   └── User.js               # User model
├── middlewares/              # Middleware for validation and authentication
│   └── auth.js               # JWT authentication middleware
├── routes/                   # API route definitions
│   ├── noteRoutes.js         # Note-related routes
│   └── userRoutes.js         # User-related routes
├── tests/                    # Unit and integration tests
│   ├── note.test.js          # Note tests
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
git clone https://github.com/cleosilva/api-notes.git
cd notes-api
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

#### notes
* **POST /api/notes**: Creates a new note (authenticated)
* **GET /api/notes**: Retrieves all notes for the authenticated user
* **GET /api/notes/**
  : Retrieves a single note by ID (authenticated)
* **PUT /api/notes/**
  : Updates a note (authenticated) — can update features like pinning, color change, and archiving
* **DELETE /api/notes/**
  : Deletes a note (authenticated)

### Example Note Features
* **Pinning**: Notes can be pinned to always appear at the top of the list.
* **Color Change**: Notes can have customizable background colors.
* **Archiving**: Notes can be archived and unarchived.
* **Reminder**: Notes can have reminders that are triggered using WebSockets for real-time notifications.

### Swagger Documentation
````bash
http://localhost:5000/api-docs
````

### Contribution
Contributions are welcome! Feel free to open a pull request or report an issue.

### License
This project is licensed under the MIT License.



