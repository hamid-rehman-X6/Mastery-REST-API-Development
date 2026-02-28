# Blog API

A robust and secure RESTful API for a blogging platform built with Express.js, TypeScript, and MongoDB. The codebase demonstrates modern backend practices including user authentication, role‑based access control, token management, validation, and structured logging.

## 🌟 Key Features

- **Authentication & Authorization** – JWT‑based login/register with refresh tokens; role‑based access control (admin/user)
- **User Management** – endpoints for creating, updating, deleting, and fetching user profiles
- **Access/Refresh Tokens** – secure access tokens with expiration and persistent refresh tokens stored in HTTP‑only cookies and database
- **Rate Limiting** – prevents abuse with configurable limits
- **Security Hardening** – Helmet headers, CORS filtering, input validation
- **Data Validation** – `express-validator` schemas for requests and parameters
- **Logging** – Winston configured for JSON logs with levels and error stacks
- **Environment Configuration** – centralized `.env` support with sensible defaults
- **API Versioning** – v1 implemented; v2 scaffolding provided
- **Hot‑Reload Development** – Nodemon with ts-node for fast iteration
- **TypeScript with Path Aliases** – clean imports with `@/` alias
- **Graceful Shutdown** – database disconnect on SIGTERM/SIGINT

## 🛠 Tech Stack

| Component        | Technology                        |
|------------------|-----------------------------------|
| **Runtime**      | Node.js                           |
| **Language**     | TypeScript                        |
| **Web Framework**| Express.js 5.1.0                  |
| **Database**     | MongoDB + Mongoose 8.16.0         |
| **Security**     | Helmet 8.1.0, express-validator   |
| **Logging**      | Winston 3.17.0                    |
| **Rate Limiting**| express-rate-limit 7.5.0          |
| **Auth**         | jsonwebtoken, bcrypt              |
| **Dev Tools**    | Nodemon, ts-node, Prettier       |

## 📋 Prerequisites

- **Node.js** v16+
- **npm** v7+
- **MongoDB** (local or Atlas)

## 🚀 Installation

1. Clone the repo:
   ```bash
   git clone <repository-url>
   cd blog-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (see configuration section below).
4. Start development server:
   ```bash
   npm run dev
   ```
   Server listens on `http://localhost:${PORT || 3000}` by default.

## ⚙️ Configuration

### Environment Variables

| Variable               | Description                                                        | Default         | Required |
|------------------------|--------------------------------------------------------------------|-----------------|----------|
| `PORT`                 | Server port                                                        | 3000            | No       |
| `NODE_ENV`             | `development` / `production` / `test`                              | development     | Yes      |
| `MONGO_URI`            | MongoDB connection string                                          | —               | Yes      |
| `LOG_LEVEL`            | Winston log level (error, warn, info, debug)                       | info            | No       |
| `WHITELIST_ORIGINS`    | Comma‑separated list of allowed CORS origins                       | http://localhost:3000 | No |
| `JWT_ACCESS_SECRET`    | Secret used to sign access tokens                                  | —               | Yes      |
| `JWT_REFRESH_SECRET`   | Secret used to sign refresh tokens                                 | —               | Yes      |
| `ACCESS_TOKEN_EXPIRES` | Token lifetime (e.g. "15m", "1h")                              | —               | Yes      |
| `REFRESH_TOKEN_EXPIRES`| Refresh token lifetime (e.g. "7d")                               | —               | Yes      |
| `WHITELIST_ADMIN_MAILS`| Comma‑separated emails allowed to register as admin                | see config.ts   | No       |

> **Note:** The `.env.example` file provides a template for required values.

### CORS

Allowed origins are defined in `config.WHITELIST_ORIGINS`. Modify as needed.

### Admin Registration

To prevent unauthorized admin signups, only emails in `WHITELIST_ADMIN_MAILS` may register with role `admin`.

## 📁 Project Structure

```
blog-api/
├── src/
│   ├── server.ts              # App entry point, middleware & routes setup
│   ├── config/                # Environment and application config
│   │   └── index.ts
│   ├── controllers/           # Route handlers grouped by version
│   │   └── v1/
│   │       ├── auth/          # register, login, refresh-token, logout
│   │       └── user/          # user CRUD and profile endpoints
│   ├── routes/
│   │   └── v1/                # Express routers for API v1
│   ├── middlewares/           # auth, authorization, validation
│   ├── models/                # Mongoose schemas (User, Token)
│   ├── validators/            # express-validator schemas
│   ├── lib/                   # shared utilities (jwt, mongoose, rate-limit, winston)
│   ├── utils/                 # helper functions (random username, etc.)
│   ├── @types/                # custom type declarations
│   └── ...                    # other support code
├── dist/                      # compiled output (ignored in git)
├── .env.example
├── nodemon.json
├── tsconfig.json
├── package.json
└── README.md
```

## 🔌 API Endpoints

Base URL: `http://localhost:<PORT>/api/v1`

### Auth

| Method | Endpoint              | Description                                | Access        |
|--------|-----------------------|--------------------------------------------|---------------|
| POST   | `/auth/register`      | Create new user (`user` or `admin`)        | public        |
| POST   | `/auth/login`         | Log in (returns access token & cookie)     | public        |
| POST   | `/auth/refresh-token` | Refresh access token using HTTP‑only cookie | public      |
| POST   | `/auth/logout`        | Log out and clear refresh token            | authenticated |

### Users

| Method | Endpoint                     | Description                              | Access                |
|--------|------------------------------|------------------------------------------|-----------------------|
| GET    | `/users/current`             | Get profile of logged‑in user            | auth (user/admin)     |
| PUT    | `/users/current`             | Update current user                      | auth (user/admin)     |
| DELETE | `/users/current`             | Delete own account                       | auth (user/admin)     |
| GET    | `/users`                     | List users (paginated)                   | auth (admin)          |
| GET    | `/users/:userId`             | Get specific user by ID                  | auth (admin)          |
| DELETE | `/users/:userId`             | Delete user by ID                        | auth (admin)          |

#### Query Parameters

- `limit` (integer 1–50, default 20)
- `offset` (integer ≥0, default 0)

#### Request Validation

All endpoints use express-validator; invalid inputs return `400 ValidationError` with detailed messages.

#### Authentication

Access tokens are sent in `Authorization: Bearer <token>` header. Refresh tokens are stored in HTTP‑only cookies.

#### Roles

- `user`: basic access
- `admin`: can view/delete other users and list users

### Health

`GET /`  
Returns basic status JSON `{ message, status, version, timestamp }`.

## 💻 Development

### Scripts

- `npm run dev` – start server with hot reload
- `npm run format` – format source with Prettier
- `npm run format:check` – verify formatting

TypeScript is compiled on‑the‑fly via `ts-node`. To build manually:

```bash
npx tsc
```

## 🔒 Security

- **Helmet** secures headers
- **CORS** whitelisting with origin logging
- **Rate Limiting** protects endpoints
- **JWT & Cookies** for session management
- **Password Hashing** with bcrypt
- **Input Validation** prevents malformed data
- **Environment Isolation** sensitive info kept in `.env`

## 📊 Logging

- Winston configured for JSON output
- Console transport active in development
- Log levels controlled by `LOG_LEVEL`
- Errors include stack traces

## 🐛 Error Handling

- Consistent error codes (AuthenticationError, AuthorizationError, ValidationError, NotFound, ServerError)
- Database and startup errors are logged; server exits in production on startup failure.

## 🤝 Contributing

- Follow TypeScript conventions
- Keep code properly typed
- Add appropriate unit tests (if present)
- Use clear commit messages
- Respect existing file headers and license

## 📄 License

Apache License 2.0 – see [LICENSE](LICENSE).

**Author:** HamidRehman  
**Last Updated:** February 2026  
**Version:** 1.0.0

## 🔗 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Winston Logger Documentation](https://github.com/winstonjs/winston)
- [Express Rate Limit Documentation](https://github.com/nfriedly/express-rate-limit)

---

For issues, questions, or contributions, please open an issue or contact the development team.