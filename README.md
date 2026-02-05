# 📰 Node.js REST API – Authentication, Authorization & Articles

This project is a **RESTful API built with Node.js, Express, MongoDB (Mongoose)** that implements authentication, authorization and article management with role-based access control.

---

## 🚀 Tech Stack

- Node.js / Express
- MongoDB + Mongoose
- Passport.js (JWT Strategy)
- bcrypt
- jsonwebtoken (JWT)
- AccessControl (RBAC)
- Validator
- http-status
- dotenv

---

## 🔐 Authentication & Authorization

### Authentication (JWT)

- Users authenticate using **JSON Web Tokens**
- Tokens are generated on:
  - User registration
  - User login
  - Email update
- JWT can be sent via:
  - `Authorization: Bearer <token>` header
  - HTTP-only cookie (`x-access-token`)
