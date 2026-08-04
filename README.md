# Hubspace

A real-time multi-person collaboration space built with **TypeScript**, **Express**, **WebSockets**, **Prisma**, and **SQLite**.

## Try It Live

🌎 https://hubspace.onrender.com

Please be patient while the free service spins up. Then, create an account, log in, and join the shared realtime space. User accounts reset daily.

## Overview

HubSpace is a lightweight realtime web application where authenticated users can connect, appear as active participants, and interact inside a shared environment.

The project demonstrates:

* User registration and authentication
* Password hashing with Argon2
* JWT-based authentication
* Express REST API design
* WebSocket realtime communication
* Dependency injection
* Layered backend architecture
* Prisma ORM with SQLite persistence
* Database migrations
* Integration testing with Mocha, Chai, and Supertest
* Production deployment

## Application Architecture

Hubspace uses a layered backend architecture designed to separate HTTP concerns, business logic, persistence, and realtime communication.

```
Client
 |
 | HTTP / WebSocket
 v
Routes
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
Prisma ORM
 |
 v
SQLite Database


             WebSocket Server
                    |
                    v
             Realtime State
             Actor Management
             Broadcasting
```

## Backend Layers

### Routes

Responsible for defining application endpoints and connecting requests to controllers.

Examples:

* Authentication routes
* User routes
* Health check routes

Routes do not contain business logic.

---

### Controllers

Responsible for handling HTTP requests and responses.

Responsibilities:

* Extract request data
* Call service methods
* Return responses
* Translate application errors into HTTP responses

Controllers remain thin and delegate work to services.

---

### Services

Contains the core application logic.

Examples:

* User registration
* User authentication
* Password verification
* Token generation
* User management workflows

Services coordinate operations without knowing HTTP details.

---

### Repositories

Responsible for database access.

Responsibilities:

* Creating records
* Finding users
* Updating data
* Executing database operations through Prisma

Repositories isolate persistence details from the rest of the application.

---

### Database Layer

Hubspace uses Prisma ORM with SQLite for persistent storage.

Responsibilities:

* User data
* Password hashes
* Application persistence
* Schema migrations

Database changes are managed through Prisma migrations.

Prisma-generated types are used as the source of truth for database models.

---

## Realtime Layer

The realtime system runs independently from the REST API flow.

Responsibilities:

* Maintain WebSocket connections
* Authenticate connected clients
* Track active actors
* Broadcast world updates
* Synchronize connected users

The WebSocket layer shares application services while maintaining its own realtime state.

---

## Dependency Injection

Application dependencies are created externally and passed into application layers.

Examples:

* Database clients
* Repositories
* Authentication services
* Token services

This keeps components loosely coupled and allows production and test environments to use different implementations.

---

## Testing

Hubspace uses:

* Mocha
* Chai
* Supertest

Tests cover:

* REST endpoint behavior
* Authentication workflows
* Repository operations
* Database integration

The test suite uses a dedicated SQLite database with Prisma migrations applied before testing.

The schema is shared between tests while test data is reset between runs.

Run tests:

```
npm run test
```

---

## Tech Stack

### Backend

* TypeScript
* Node.js
* Express
* Prisma ORM
* SQLite
* WebSockets
* Argon2 password hashing
* JWT authentication

### Frontend

* HTML
* JavaScript
* Canvas rendering

### Testing

* Mocha
* Chai
* Supertest

### Deployment

* Render Web Service

---

## Project Goals

Hubspace is a learning project focused on building a complete realtime application from the ground up.

The project explores:

* Backend architecture
* Authentication systems
* Database design
* ORM usage
* WebSocket communication
* Testing strategies
* Dependency injection
* Production deployment

---

# Getting Started Locally

## Requirements

* Node.js 24+
* npm

---

## Installation

Install dependencies:

```
npm install
```

---

## Setup

Create environment files and required directories:

```
npm run setup
```

This creates:

* `.env`
* `.env.test`
* `data/`

Existing files are preserved.

---

## Generate Prisma Client

```
npm run db:generate
```

---

## Database Setup

Apply migrations:

```
npm run db:migrate
```

Prisma will create the SQLite database file automatically.

Development database:

```
data/hubspace.sqlite
```

Test database:

```
data/hubspace-test.sqlite
```

---

## Running the Application

Development mode:

```
npm run dev
```

---

## Running Tests

```
npm run test
```

---

## Database Commands

Generate Prisma client:

```
npm run db:generate
```

Run migrations:

```
npm run db:migrate
```

Open Prisma Studio:

```
npm run db:studio
```

Check database:

```
npm run db:check
```

---

## Environment Variables

Example development environment:

```
DATABASE_URL="file:./data/hubspace.sqlite"
JWT_SECRET="development-secret"
PORT=3000
```

Example test environment:

```
DATABASE_URL="file:./data/hubspace-test.sqlite"
JWT_SECRET="test-secret"
PORT=3001
```

---

## Project Structure

```
src
 |
 ├── auth
 ├── controllers
 ├── middleware
 ├── repositories
 ├── services
 ├── db
 │    ├── migrations
 │    └── prisma.ts
 ├── websocket
 └── app.ts


tests
 |
 ├── auth
 ├── repositories
 └── helpers
```

---

## License

MIT
