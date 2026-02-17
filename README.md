# Blog API

A robust and scalable RESTful API for a blogging platform built with Express.js, TypeScript, and MongoDB. This project demonstrates modern backend development practices with security, performance optimization, and comprehensive logging.

## 🌟 Features

- **Express.js Server** - Fast and minimalist web framework for Node.js
- **TypeScript** - Strongly-typed JavaScript for better code quality and maintainability
- **MongoDB Integration** - Document-based database with Mongoose ODM
- **Rate Limiting** - Protects API from excessive requests and abuse
- **Security** - Helmet middleware for setting secure HTTP headers
- **CORS Support** - Configurable Cross-Origin Resource Sharing
- **Request Compression** - Gzip compression for optimized response payloads
- **Structured Logging** - Winston logger for comprehensive application logging
- **Environment Configuration** - Secure configuration management using environment variables
- **API Versioning** - Support for multiple API versions (v1, v2)
- **Hot Reload Development** - Nodemon for automatic server restart on file changes
- **Path Aliases** - TypeScript path mapping for cleaner imports

## 🛠 Tech Stack

| Component | Technology |
|-----------|------------|
| **Runtime** | Node.js |
| **Language** | TypeScript |
| **Web Framework** | Express.js 5.1.0 |
| **Database** | MongoDB + Mongoose 8.16.0 |
| **Security** | Helmet 8.1.0 |
| **Logging** | Winston 3.17.0 |
| **Rate Limiting** | Express Rate Limit 7.5.0 |
| **Development** | Nodemon, ts-node |

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **MongoDB** (local or cloud instance - MongoDB Atlas recommended)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment configuration**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/blog-db
   LOG_LEVEL=info
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:3000`

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 3000 | No |
| `NODE_ENV` | Environment (development/production/test) | development | Yes |
| `MONGO_URI` | MongoDB connection string | - | Yes |
| `LOG_LEVEL` | Winston logger level (error/warn/info/debug) | info | No |

### CORS Configuration

The API includes configurable CORS. Currently whitelisted origins:
- `http://localhost:3000`

Modify the `WHITELIST_ORIGINS` array in [src/config/index.ts](src/config/index.ts) to allow additional origins.

## 📁 Project Structure

```
blog-api/
├── src/
│   ├── server.ts              # Express app setup and middleware configuration
│   ├── config/
│   │   └── index.ts           # Centralized configuration and environment variables
│   ├── lib/
│   │   ├── express_rate_limit.ts  # Rate limiting configuration
│   │   ├── mongoose.ts         # MongoDB connection setup
│   │   └── winston.ts          # Logging configuration
│   └── routes/
│       ├── v1/
│       │   ├── index.ts        # V1 API routes
│       │   └── auth.ts         # Authentication endpoints
│       └── v2/                 # V2 API routes (planned)
├── dist/                      # Compiled JavaScript output
├── .env                       # Environment variables (not in version control)
├── .env.example              # Template for environment variables
├── nodemon.json              # Nodemon configuration for development
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies and scripts
├── LICENSE                   # Apache-2.0 License
└── README.md                 # This file
```

### Key Directories

- **src/** - TypeScript source code
- **src/config/** - Application configuration
- **src/lib/** - Shared utility libraries and configurations
- **src/routes/** - API endpoints organized by version
- **dist/** - Compiled JavaScript (generated during build)

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### Health Check
```http
GET /
```
Returns API status and version information.

### Authentication Routes
```
GET/POST /auth/*
```
Authentication related endpoints (to be implemented).

## 💻 Development

### Available Scripts

- **`npm run dev`** - Start development server with hot reload

### Build and Compilation

TypeScript is automatically compiled during development via `ts-node`. To manually compile:

```bash
npx tsc
```

### Code Quality

The project includes Prettier for code formatting. Configuration is in [.prettierrc](.prettierrc).

## 🔒 Security Features

- **Helmet** - Sets security HTTP headers
- **CORS** - Validates and controls cross-origin requests
- **Rate Limiting** - Prevents API abuse and DDoS attacks
- **Input Validation** - URL-encoded and JSON body parsing with size limits
- **Environment Isolation** - Secure configuration management

## 📊 Logging

The application uses Winston for structured logging:

- **Console Transport** (Development only)
- **JSON Format** with timestamps and error stacks
- **Configurable Log Levels** (error, warn, info, debug)

Log levels can be controlled via the `LOG_LEVEL` environment variable.

## 🐛 Error Handling

- Database connection errors are logged and handled gracefully
- CORS violations are logged with origin information
- Server startup failures are logged with detailed error information
- Production environment exits on startup failure

## 📝 Contributing

When contributing to this project:

1. Follow the existing code style and TypeScript conventions
2. Maintain proper copyright headers in new files
3. Use meaningful commit messages
4. Ensure code is properly typed with TypeScript
5. Test thoroughly before submitting

## 📄 License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for details.

---

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