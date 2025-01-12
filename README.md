# TaskFlow

TaskFlow is a task management application designed to help you organize and manage your tasks efficiently. This README file provides detailed instructions on setting up the project, as well as an overview of the available routes and their functionalities.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with TaskFlow, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/TaskFlow.git
    cd TaskFlow
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up the database:**
    Ensure you have a running instance of MongoDB. You can use a local instance or a cloud-based service like MongoDB Atlas.

4. **Configure environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

## Configuration

TaskFlow uses environment variables for configuration. Make sure to set the following variables in your `.env` file:

- `PORT`: The port on which the server will run.
- `MONGODB_URI`: The connection string for your MongoDB database.
- `JWT_SECRET`: A secret key for signing JSON Web Tokens.

## Usage

To start the application, run the following command:

```bash
npm start
```

The server will start on the port specified in the `.env` file. By default, it will run on `http://localhost:3000`.

## API Routes

### Authentication

- **POST /api/auth/register**
  - Registers a new user.
  - Request body: `{ "username": "string", "password": "string" }`
  - Response: `{ "message": "User registered successfully" }`

- **POST /api/auth/login**
  - Authenticates a user and returns a JWT token.
  - Request body: `{ "username": "string", "password": "string" }`
  - Response: `{ "token": "jwt_token" }`

### Tasks

- **GET /api/tasks**
  - Retrieves all tasks for the authenticated user.
  - Headers: `{ "Authorization": "Bearer jwt_token" }`
  - Response: `[{ "id": "string", "title": "string", "description": "string", "status": "string" }]`

- **POST /api/tasks**
  - Creates a new task.
  - Headers: `{ "Authorization": "Bearer jwt_token" }`
  - Request body: `{ "title": "string", "description": "string", "status": "string" }`
  - Response: `{ "message": "Task created successfully" }`

- **PUT /api/tasks/:id**
  - Updates an existing task.
  - Headers: `{ "Authorization": "Bearer jwt_token" }`
  - Request body: `{ "title": "string", "description": "string", "status": "string" }`
  - Response: `{ "message": "Task updated successfully" }`

- **DELETE /api/tasks/:id**
  - Deletes a task.
  - Headers: `{ "Authorization": "Bearer jwt_token" }`
  - Response: `{ "message": "Task deleted successfully" }`

## Contributing

We welcome contributions to TaskFlow! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
