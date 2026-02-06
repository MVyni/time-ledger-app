# Time Ledger App ⏳

API developed for time tracking and management. With this application, you can log your work entries, track duration, and calculate earnings based on hourly rates.

## Table of Contents 📌

- [About the Project](#about-the-project-)
- [How to Run the Project](#how-to-run-the-project-)
- [Architecture](#architecture-)
- [Technologies](#technologies-)
- [License](#license-)

## About the Project 🔗

**Time Ledger App** is a RESTful application developed with **Node.js** and **Express**, designed to help users track their work hours and earnings. The application allows users to register work entries, recording the duration and the hourly rate applicable at that time.

### Key Features

#### User Management
- **User Registration**: Create new accounts with name, email, and password.
- **Authentication**: Authentication system using JWT (JSON Web Tokens) to protect API routes.

#### Work Entry Management
- **Entry Registration**: Log work entries with:
  - Date
  - Duration (in minutes)
  - Hourly rate at the time
- **Entry Association**: All entries are linked to a specific user.

#### Security and Access Control
- Authentication required for operations.
- Passwords encrypted with bcryptjs.
- JWT tokens to maintain user session.

## How to Run the Project 🔧

Follow the instructions below to build and run the project simply and easily.

### Prerequisites

Make sure you have installed:

- **Node.js** (version 18 or higher)
- **PostgreSQL**
- **npm**

### Database Configuration

1. Configure the environment variables in the `.env` file (use `.env.example` as a reference):

```env
DATABASE_URL="postgresql://user:password@localhost:5432/timeledger?schema=public"
# Add other necessary env vars
```

### Installation and Execution

1. Clone the repository:

```bash
git clone https://github.com/MVyni/time-ledger-app.git
cd time-ledger-app
```

2. Install dependencies:

```bash
npm install
```

3. Run database migrations:

```bash
npx prisma migrate dev
```

4. Start the server in development mode:

```bash
npm run dev
```

### Running Tests

```bash
npm test
# or for e2e
npm run test:e2e
```

## Architecture 🏗️

**Time Ledger App** was developed following the principles of a RESTful architecture.

### Key Characteristics

#### RESTful Base
- The API follows REST principles.

#### Core Technologies
- **Node.js**: Runtime environment.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: Static typing.

#### Database
- **Prisma ORM**: Next-generation Node.js and TypeScript ORM.
- **PostgreSQL**: Relational database.

#### Security and Authentication
- **JWT**: Token-based authentication.
- **Bcryptjs**: Password hashing.

#### Data Validation
- **Zod**: Schema validation.

#### Testing
- **Vitest**: Testing framework.
- **Supertest**: HTTP assertions.

## Technologies 💻

### Main Dependencies
- **express**
- **prisma**
- **@prisma/client**
- **jsonwebtoken**
- **bcryptjs**
- **zod**
- **dayjs**

### Development Dependencies
- **typescript**
- **tsx**
- **vitest**
- **supertest**
