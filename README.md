# ShaFi BackEnd

## Related Projects
In order for the frontend to work correctly, you need to connect to the backend service. Follow the guide below to set it up:

- **ShaFi-FrontEnd**: [GitHub Repository](https://github.com/SimoDod/ShaFi-FrontEnd)

## Overview
This is the backend for ShaFi, a property management application. It handles:
- User authentication and authorization
- Property reservations 
- Ledger management for expenses and income
- API endpoints for the frontend to interact with

## Technologies Used
- **Express.js** for server framework
- **Mongoose** with MongoDB for database operations
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Next-auth** for authentication strategies

## Setup & Installation

### Development Environment
Ensure you have Node.js and MongoDB with MongoDB shell installed and running.
- Open MongoDB shell and insert those commands in order to createa a user:
```bash
use ShaFi;

db.users.insertOne({
  "username": "ExampleUser",
  "email": "example@example.com",
  "password": "$2a$10$NHfnD96z/M5X2i1hIRN2X./TvH2Hkpbw4et2PoHMkpUeOh1Qg3nnW",
  "role": "user",
});
```

### Clone the Repository
```bash
git clone https://github.com/SimoDod/ShaFi-BackEnd.git
```

### Setup & Installation
```bash
npm install
```
### Environment Configuration

### Create a .env file in the root directory with the following content:
```bash
PORT=8080
MONGODB_URI=mongodb://localhost:27017/ShaFi
JWT_SECRET=[generate a secure secret here]
```

### Run the project
```bash
npm run dev
```

You can login with credentials:
 - email: example@example.com
 - password: 123456

### Contributions
Feel free to submit PRs for bug fixes, improvements, or new features.