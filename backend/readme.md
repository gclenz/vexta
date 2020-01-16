# VUTTR API

## Tech stack
- Node.js
- PostgreSQL

### Dependencies
- ESM - Allow our code to run using import/export (not supported on node 12.13.0 LTS). This makes easier to switch between back-end and front-end.
- Express - A simple and lightweight Node.js web server.
- Sequelize - An ORM to connect your application to SQL databases.
- dotENV - A secure way to pass sensitive data to your application using environment variables.

### Development Dependencies
- Nodemon - Makes the server restart automatically on every code change.

### Recommended Infrastructure Solutions
- AWS RDS - PostgreSQL (you can use the free tier instance).