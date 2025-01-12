# TaskFlow

TaskFlow is a task management application that helps you organize and manage your tasks efficiently. This README provides comprehensive documentation for setting up, configuring, and using the application.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Projects](#projects)
  - [Tasks](#tasks)
  - [User Project Management](#user-project-management)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Project management with categories and tags
- Task creation and assignment
- Email verification system
- Password reset functionality
- User project invitations and collaborations

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shivang-cyber/TaskFlow.git
   cd TaskFlow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Ensure you have MongoDB installed locally or use MongoDB Atlas
   - Configure your connection string in the environment variables

4. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

## Configuration

The application uses the following environment variables:

| Variable      | Description                              | Required |
|--------------|------------------------------------------|----------|
| PORT         | Server port number                       | Yes      |
| MONGODB_URI  | MongoDB connection string                | Yes      |
| JWT_SECRET   | Secret key for JWT token generation      | Yes      |

## API Documentation

### Authentication

#### User Registration
- **POST** `/api/v1/auth/signup`
- Creates a new user account
- Request body:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

#### Email Verification
- **GET** `/api/v1/auth/verify-email?token={token}`
- Verifies user email address using the provided token

#### User Login
- **POST** `/api/v1/auth/login`
- Authenticates user and returns JWT token
- Request body:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Password Reset
- **POST** `/api/v1/auth/forgot-password`
- Initiates password reset process
- **POST** `/api/v1/auth/reset-password`
- Completes password reset with token

### Projects

#### List Projects
- **GET** `/api/v1/project`
- Retrieves authenticated user's projects
- Requires JWT token in Authorization header

#### Create Project
- **POST** `/api/v1/project/create`
- Creates new project
- Request body:
  ```json
  {
    "title": "string",
    "shortDescription": "string",
    "description": "string",
    "category": ["string"],
    "tags": ["string"],
    "productImage": "string"
  }
  ```

#### Update Project
- **PUT** `/api/v1/project/update/:projectId`
- Updates existing project
- Requires project ID and JWT token

#### Delete Project
- **DELETE** `/api/v1/project/delete/:projectId`
- Removes project
- Requires project ID and JWT token

### Tasks

#### List Tasks
- **GET** `/api/v1/task/:projectId`
- Retrieves all tasks for a specific project
- Requires project ID and JWT token

#### Create Task
- **POST** `/api/v1/task`
- Creates new task in project
- Request body:
  ```json
  {
    "projectId": "string",
    "title": "string",
    "description": "string",
    "assignedTo": "string"
  }
  ```

#### Update Task
- **PUT** `/api/v1/task/:taskId`
- Updates existing task
- Supports status changes: Todo (0), Pending (1), Done (2)

### User Project Management

#### Accept Project Invitation
- **POST** `/api/v1/userProject/accept-invitation`
- Accepts invitation to join project
- Requires userProjectId parameter

#### Add User to Project
- **POST** `/api/v1/userProject/add-user`
- Adds user to project
- Request body:
  ```json
  {
    "userId": "string",
    "projectId": "string"
  }
  ```

## Contributing

We welcome contributions to TaskFlow! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

Please ensure your code follows our coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.