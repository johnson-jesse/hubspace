# NESWS Application Workflow

## Overview

NESWS is an Express-based backend application built around dependency injection, service boundaries, repository abstraction, and testable application composition.

The application follows a layered architecture:

```
HTTP Request
    |
    v
Express Routes
    |
    v
Controllers
    |
    v
Services
    |
    v
Repositories
    |
    v
Database
```

Each layer has a specific responsibility and communicates only with the layer directly below it.

---

# Application Startup Flow

The application starts by creating the dependency container.

```
server.ts
    |
    v
container.ts
    |
    +--> Database connection
    |
    +--> Repositories
    |
    +--> Services
    |
    +--> Token services
    |
    v
createApp(dependencies)
```

The container is the **composition root**.

It creates and connects all application pieces.

Application code should not import from `container.ts`.

The container creates dependencies; it does not act as a global service registry.

---

# Dependency Flow

The production application:

```
Database
    |
    v
UserRepository
    |
    v
UserService
    |
    v
AuthService
    |
    v
Controllers
    |
    v
Routes
    |
    v
Express App
```

Example:

```text
UserRepository
    |
    +-- createUser()
    +-- findUserByEmail()
    +-- findUserById()


UserService
    |
    +-- registerUser()
    +-- getUserById()


AuthService
    |
    +-- login()
```

---

# Request Lifecycle

## User Registration

Endpoint:

```
POST /api/auth/register
```

Request:

```json
{
  "email": "test@example.com",
  "password": "secret"
}
```

Flow:

```
Request
 |
 v
auth.routes.ts
 |
 v
auth.controller.ts
 |
 v
UserService.registerUser()
 |
 v
UserRepository.findUserByEmail()
 |
 +-- User exists?
 |       |
 |       +--> Yes: throw EMAIL_EXISTS
 |
 v
UserRepository.createUser()
 |
 v
Database INSERT
 |
 v
Response
```

Response:

```json
{
  "id": 1,
  "email": "test@example.com"
}
```

---

# User Login

Endpoint:

```
POST /api/auth/login
```

Flow:

```
Request
 |
 v
AuthController.login()
 |
 v
AuthService.login()
 |
 v
UserRepository.findUserByEmail()
 |
 v
PasswordHasher.verify()
 |
 v
TokenService.sign()
 |
 v
Return JWT
```

Response:

```json
{
  "token": "jwt-token"
}
```

The token contains:

```json
{
  "userId": 1,
  "email": "test@example.com"
}
```

---

# Authentication Middleware

Protected routes use:

```
Authorization: Bearer <token>
```

Flow:

```
Request
 |
 v
createAuthMiddleware()
 |
 v
Extract JWT
 |
 v
TokenService.verify()
 |
 v
Attach payload to request
 |
 v
Continue request
```

The middleware adds:

```ts
req.user
```

Example:

```ts
{
  userId: 1,
  email: "test@example.com"
}
```

---

# Current User Endpoint

Endpoint:

```
GET /api/users/me
```

Flow:

```
Request
 |
 v
Authentication Middleware
 |
 v
User Route
 |
 v
UserService.getUserById()
 |
 v
UserRepository.findUserById()
 |
 v
Database
 |
 v
Return User
```

Response:

```json
{
  "user": {
    "id": 1,
    "email": "test@example.com"
  }
}
```

---

# Error Handling Flow

Errors are handled centrally.

Request flow:

```
Route
 |
 v
Controller
 |
 v
Service
 |
 |
 +--> throw AppError
 |
 v
errorMiddleware
 |
 v
JSON Error Response
```

Example:

```json
{
  "error": "EMAIL_EXISTS",
  "message": "User already exists"
}
```

Unknown routes are handled by:

```
notFoundMiddleware
```

Example:

```json
{
  "error": "NOT_FOUND",
  "message": "Route not found"
}
```

---

# Testing Architecture

Tests do not use the production container.

Instead:

```
Test
 |
 v
createTestApp()
 |
 +--> In-memory SQLite database
 |
 +--> Test repositories
 |
 +--> Test services
 |
 +--> Express application
```

Example:

```text
createTestDatabase()
        |
        v
createUserRepository()
        |
        v
createUserService()
        |
        v
createAuthService()
        |
        v
createApp()
```

Each test receives a clean application instance.

This prevents tests from sharing state.

---

# Important Architecture Rules

## 1. No imports from container.ts

Avoid:

```ts
import { userService } from "../container";
```

Instead:

```ts
dependencies.userService
```

Dependencies should always flow downward.

---

## 2. Services contain business logic

Controllers should not:

* query databases
* validate business rules
* create tokens

Controllers coordinate requests.

Services make decisions.

---

## 3. Repositories only handle persistence

Repositories know:

* SQL
* database operations
* data mapping

Repositories do not know:

* HTTP
* authentication
* business rules

---

## 4. Factories create configured objects

Examples:

```ts
createUserRepository(db)

createUserService(repository)

createAuthService(
  repository,
  passwordHasher,
  tokenService
)

createApp(dependencies)
```

This allows production and testing to use different implementations.

---

# Future Feature Flow

New features should follow the same pattern:

```
Route
 |
 v
Controller
 |
 v
Service
 |
 v
Repository
 |
 v
Database
```

Example:

```
Workspace
    |
    +-- WorkspaceController
    |
    +-- WorkspaceService
    |
    +-- WorkspaceRepository
```

Authentication answers:

> Who are you?

Authorization answers:

> What are you allowed to access?

The current architecture is ready to support both.
