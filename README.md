# Diploma project

This project is for university library that simplifies many processes
like searching books, borrowing them, create orders for books.

## Roles

- Admin - someone from the library side who creates new students, books, approve borrowing books, etc.
- Student - person who borrows books.

##Technologies

1. Node.js and JavaScript
2. DB - PostgreSQL
3. Redis - for storing sessions
4. Knex - for building SQL queries and run migrations
5. Docker

## Running the app

Create config folder with .env-${environment} file with credentials.
###DEV

1. `npm run dev:up`
2. `dev:start`

NOTE: install https://www.docker.com/ if you do not have.

##Migrations
Run all commands in container(`npm run dev:up`).

- To run the next migration that has not yet been run: `knex migrate:up`
- To rollback the last batch of migrations: `knex migrate:rollback`
- To run all migrations that have not yet been run: `knex migrate:latest`

##ENV
###DEV-ENV example

- PORT=3000
- HOST=0.0.0.0
- DB_NAME=diploma
- DB_ADMIN=admin
- DB_PASSWORD=1234567890
- DB_HOST_PORT=5432
- DB_CONTAINER_PORT=5432
- DB_MAX_CONNECTIONS=50
- SALT=supersecretsalt
- REDIS_CONTAINER_PORT=6379
- REDIS_HOST_PORT=6379
- REDIS_PASSWORD=1234567890
- REDIS_USER=default
