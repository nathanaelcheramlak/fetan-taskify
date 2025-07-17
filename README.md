# 📝 Task Management API

A secure and scalable RESTful API built with **TypeScript**, **Express**, and **MongoDB**. This API allows users to register, authenticate, and manage their personal tasks with full CRUD functionality.

---

## 🚀 Features

- ✅ User Registration & Login (JWT-based authentication)
- 🔐 Protected Routes using JWT and Cookies
- 📋 Task CRUD: Create, Read (with Pagination), Update, Delete
- 🧰 Input validation & error handling
- 🌐 RESTful API following best practices

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/nathanaelcheramlak/fetan-taskify
cd fetan-taskify
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a .env file in the root directory and add:

```ini

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### 4. Run the project

Development (with ts-node)

```bash
npm run dev
```

Build & Start (for production)

```bash
npm run build
npm start
```

## 📬 API Endpoints

### **Auth**

- `POST /api/v1/auth/register` – Create a new user
- `POST /api/v1/auth/login` – Log in and receive token

### **Profile**

- `GET /api/v1/profile` – Get authenticated user's info

### **Tasks** (Protected)

- `POST /api/v1/tasks` – Create a new task
- `GET /api/v1/tasks?limit=10&page=1` – Get paginated tasks
- `PATCH /api/v1/tasks/:id` – Update task status
- `DELETE /api/v1/tasks/:id` – Delete a task

## 🙌 Contributions

Pull requests and suggestions are welcome! Feel free to fork this repo and improve it.

## ✨ Author

Created with ❤️ by [Nathanael](https://github.com/nathanaelcheramlak)
@ 2025
