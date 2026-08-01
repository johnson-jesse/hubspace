# Hubspace

A real-time multi person collaboration space built with **TypeScript**, **Express**, **WebSockets**, and **SQLite**.

## Try It Live

🌎 https://hubspace.onrender.com

Please be patient while the free service spins up. Then, create an account, log in, and join the shared realtime space. User accounts reset daily

## Overview

HubSpace is a lightweight realtime web application where authenticated users can connect, appear as active participants, and interact inside a shared environment.

The project demonstrates:

- User registration and authentication
- Password hashing with Argon2
- JWT-based authentication
- Express REST API design
- WebSocket realtime communication
- Server-side state management
- SQLite persistence with migrations
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

Services coordinate operations without knowing HTTP details.

---

### Repositories

Responsible for database access.

Responsibilities:
- Creating records
- Finding users
- Updating data
- Executing queries

Repositories isolate SQLite implementation details from the rest of the application.

---

### Database Layer

SQLite provides persistent storage.

Responsibilities:
- User data
- Password hashes
- Migration tracking
- Application state persistence

Database changes are managed through migrations.

---

## Realtime Layer

The realtime system runs independently from the REST API flow.

Responsibilities:
- Maintain WebSocket connections
- Authenticate connected clients
- Track active actors
- Broadcast world updates
- Synchronize connected users

The WebSocket layer shares application services while maintaining its own realtime state.

## Dependency Injection

Application dependencies are created centrally and passed into the application layers.

This keeps components loosely coupled and makes individual services easier to test and replace.

## Tech Stack

### Backend

- TypeScript
- Express
- WebSockets
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

Hubspace is a learning project focused on building a complete realtime application from the ground up, including authentication, networking, persistence, and deployment.

# Getting Started Locally

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.14. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
