# Hubspace

A real-time multi-person collaboration space built with **TypeScript**, **Node.js**, **Express**, **WebSockets**, **Prisma**, and **SQLite**.

## Try It Live

🌎 https://hubspace.onrender.com

Please be patient while the free service spins up. Then, create an account, log in, and join the shared realtime space. User accounts reset daily.

## Overview

HubSpace is a lightweight realtime web application where authenticated users can connect, appear as active participants, and interact inside a shared environment.

The project demonstrates:

- User registration and authentication
- Password hashing with Argon2
- JWT-based authentication
- Express REST API design
- WebSocket realtime communication
- Server-side state management
- Prisma ORM with SQLite persistence
- Database migrations
- Dependency injection and layered architecture
- Deployment as a production web service

## Application Architecture

Hubspace uses a layered backend architecture designed to separate HTTP concerns, business logic, persistence, and realtime communication.

```text
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

- Authentication routes
- User routes
- Health check routes

Routes do not contain business logic.

---

### Controllers

Responsible for handling HTTP requests and responses.

Responsibilities:

- Extract request data
- Call service methods
- Return responses
- Translate application errors into HTTP responses

Controllers remain thin and delegate work to services.

---

### Services

Contains the core application logic.

Examples:

- User registration
- User authentication
- Password verification
- Token generation
- User management workflows

Services coordinate operations without knowing HTTP or database implementation details.

---

### Repositories

Responsible for abstracting persistence operations.

Responsibilities:

- Creating records
- Finding users
- Updating data
- Managing database queries

Repositories isolate Prisma implementation details from the rest of the application and allow persistence concerns to change without affecting business logic.

---

### Database Layer

SQLite provides persistent storage through Prisma ORM.

Responsibilities:

- User data
- Password hashes
- Application persistence
- Database schema migrations

Database changes are managed through Prisma migrations.

---

## Realtime Layer

The realtime system runs independently from the REST API flow.

Responsibilities:

- Maintain WebSocket connections
- Authenticate connected clients
- Track active participants
- Broadcast world updates
- Synchronize connected users

The WebSocket layer shares application services while maintaining its own realtime state.

## Dependency Injection

Application dependencies are created centrally and passed into application layers.

This keeps components loosely coupled and makes individual services easier to test, replace, and maintain.

Examples of injected dependencies:

- User services
- Authentication services
- Repositories
- Token services
- Realtime managers

## Tech Stack

### Backend

- TypeScript
- Node.js
- Express
- WebSockets
- Prisma ORM
- SQLite
- Argon2 password hashing
- JWT authentication

### Frontend

- HTML
- JavaScript
- Canvas rendering

### Deployment

- Render Web Service

## Project Goals

Hubspace is a learning project focused on building a complete realtime application from the ground up, including authentication, networking, persistence, testing, and deployment.

The project emphasizes:

- Clean backend architecture
- Separation of concerns
- Testable application design
- Real-time communication patterns
- Practical Node.js development

# Getting Started Locally

Install dependencies:

```bash
npm install
```

Generate the Prisma client:

```bash
npm run db:generate
```

Run database migrations:

```bash
npm run db:migrate
```

Start the development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

## Database Commands

Generate Prisma client:

```bash
npm run db:generate
```

Create and apply migrations:

```bash
npm run db:migrate
```

Open Prisma Studio:

```bash
npm run db:studio
```

Seed the database:

```bash
npm run db:seed
```

Check database state:

```bash
npm run db:check
```
