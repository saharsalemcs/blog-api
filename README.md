# Blog API

A simple RESTful Blog API built with Node.js, Express, and MongoDB.

## Features

- User registration and login with JWT authentication
- Password hashing with bcryptjs
- CRUD operations for blog posts
- Role-based access (user / admin) and owner-only edit/delete
- Image upload with Multer (user avatar and post cover image)
- Validation with express-validator
- Centralized error handling

## Tech Stack

Node.js, Express, MongoDB Atlas, Mongoose, JWT, bcryptjs, Multer

## Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/saharsalemcs/blog-api.git
   cd blog-api
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file (copy `.env.example`) and fill in the values

   ```
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret
   JWT_EXPIRES_IN=7d
   ```

4. Run the server

   ```bash
   npm run dev
   ```

## Endpoints

### Auth

| Method | Path                 | Description                                   | Access |
| ------ | -------------------- | --------------------------------------------- | ------ |
| POST   | `/api/auth/register` | Register a new user (optional `avatar` image) | Public |
| POST   | `/api/auth/login`    | Login and receive a token                     | Public |

### Posts

| Method | Path                 | Description                           | Access              |
| ------ | -------------------- | ------------------------------------- | ------------------- |
| GET    | `/api/posts`         | Get all posts                         | Public              |
| GET    | `/api/posts/:postId` | Get a single post                     | Public              |
| POST   | `/api/posts`         | Create a post (optional `coverImage`) | Logged-in user      |
| PATCH  | `/api/posts/:postId` | Update a post                         | Post owner          |
| DELETE | `/api/posts/:postId` | Delete a post                         | Post owner or admin |

**Query parameters for `GET /api/posts`:**

- `status` — `draft` or `published`
- `page` — page number (default `1`)
- `limit` — results per page (default `10`)

## Authentication

Send the token in the request header for protected routes:

```
Authorization: Bearer <token>
```

## Error Format

```json
{
  "status": "fail",
  "message": "post not found",
  "code": 404
}
```

## File Uploads

Requests that include images use `multipart/form-data`. Only image files are accepted, with a maximum size limit.
