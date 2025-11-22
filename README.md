# Authenticated Todo App

A full-stack todo application with user authentication built with Express.js and vanilla JavaScript.

## Features

- 🔐 User authentication (registration & login)
- 🎯 JWT-based authorization
- ✅ Create, read, update, and delete todos
- 👤 User-specific todo lists
- 🔒 Password hashing with bcrypt
- 📱 Single-page application interface

## Tech Stack

**Backend:**

- Node.js
- Express.js
- SQLite (better-sqlite3)
- JWT (jsonwebtoken)
- bcrypt

**Frontend:**

- HTML5
- CSS3
- Vanilla JavaScript

## Installation

1. Clone the repository

```bash
git clone https://github.com/Jordan-devs/todo-application.git
cd todo-application
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory

```env
PORT=5000
JWT_SECRET=your_secret_key_here
```

4. Run the application

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Todos (Protected Routes)

- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Project Structure

```
├── src/
│   ├── server.js          # Express server setup
│   ├── db.js              # Database configuration
│   ├── routes/
│   │   ├── auth.js        # Authentication routes
│   │   └── todos.js       # Todo CRUD routes
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   └── public/            # Frontend files
│       ├── index.html
│       ├── style.css
│       └── fanta.css
├── .env
├── .gitignore
└── package.json
```

## Security Features

- Passwords hashed using bcrypt
- JWT tokens for stateless authentication
- Protected routes with authentication middleware
- User-specific data isolation

## Live Demo

[https://todo-app-twfm.onrender.com/](https://todo-app-twfm.onrender.com/)

> **Note:** App is hosted on Render's free tier. Database resets on redeployment.

## Learning Outcomes

This project helped me learn:

- RESTful API design
- Authentication and authorization with JWT
- Secure password handling
- SQL database operations
- Express middleware patterns
- Single-page application architecture

## Future Improvements

- [ ] Migrate to TypeScript

## License

MIT

---

Built as part of my Backend learning journey 🚀
