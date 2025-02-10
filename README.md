# Todo App API

## Overview
This is a simple and secure Todo App API built with Node.js, Express, and MongoDB. It provides user authentication using JWT and allows users to manage their tasks efficiently.

---

## Features
- User Authentication (Sign Up, Sign In)
- JWT-based Authorization
- Create, Update, Delete, and Retrieve Todos
- Mark Todos as Completed
- Retrieve all Todos of a user

---

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Mohit-Kumar-3114/Todo-App.git
   cd backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the project root and add:
   ```sh
   DATABASE_URL=<your_mongodb_connection_string>
   JWT_SECRET=<your_secret_key>
   ```

4. Start the server:
   ```sh
   npm run dev
   ```

5. The server will run on `http://localhost:3000`

---

## API Documentation

### Authentication
#### Sign Up
- **Endpoint:** `POST /api/v1/signup`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "jwt": "your_jwt_token",
    "name": "John Doe",
    "id": "user_id"
  }
  ```

#### Sign In
- **Endpoint:** `POST /api/v1/signin`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "jwt": "your_jwt_token",
    "name": "John Doe",
    "id": "user_id"
  }
  ```

---

### Todo Management
#### Create Todo
- **Endpoint:** `POST /api/v1/todo`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```
- **Request Body:**
  ```json
  {
    "title": "New Task",
    "content": "This is a new task."
  }
  ```
- **Response:**
  ```json
  {
    "id": "todo_id",
    "title": "New Task",
    "content": "This is a new task.",
    "completed": false
  }
  ```

#### Update Todo
- **Endpoint:** `PUT /api/v1/todo`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```
- **Request Body:**
  ```json
  {
    "id": "todo_id",
    "title": "Updated Task",
    "content": "Updated content."
  }
  ```
- **Response:**
  ```json
  {
    "message": "Updated todo"
  }
  ```

#### Delete Todo
- **Endpoint:** `DELETE /api/v1/todo/:id`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Todo deleted successfully"
  }
  ```

#### Get Single Todo
- **Endpoint:** `GET /api/v1/todo/:id`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "todo_id",
    "title": "Task Title",
    "content": "Task content",
    "createdAt": "2024-02-10T12:34:56.789Z",
    "authorId": "user_id",
    "completed": false
  }
  ```

#### Get All Todos
- **Endpoint:** `GET /api/v1/all-todo`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```
- **Response:**
  ```json
  [
    {
      "_id": "todo_id1",
      "title": "Task 1",
      "content": "Content of task 1",
      "createdAt": "2024-02-10T12:34:56.789Z",
      "authorId": "user_id",
      "completed": false
    },
    {
      "_id": "todo_id2",
      "title": "Task 2",
      "content": "Content of task 2",
      "createdAt": "2024-02-11T12:34:56.789Z",
      "authorId": "user_id",
      "completed": true
    }
  ]
  ```

#### Mark Todo as Completed
- **Endpoint:** `PUT /api/v1/complete-todo`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```
- **Request Body:**
  ```json
  {
    "id": "todo_id"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Updated todo and marked as completed",
    "todo": {
      "_id": "todo_id",
      "title": "Task Title",
      "content": "Task content",
      "completed": true
    }
  }
  ```

---

## Author

Developed by [Mohit Kumar](https://github.com/Mohit-Kumar-3114) and [Harsh Kumar Mishra](https://github.com/Harshmishra001).



