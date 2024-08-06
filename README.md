## Assignment 3 CRUD API
My task is to create a RESTful API, according to the given requirements.

> **Notes:**
> - Start with this boilerplate https://github.com/nabhannaufal/service-boilerplate, remove unused code
> - Add logger in code (error, debug or info)
> - Add Unit test, should be pass `coverageThreshold`
> - Use MYSQL Database
> - Add validation request
> - Add handle response status (200, 400, 500)
> - Implementation redis
> - Handle authentication / authorization, using JWT
> - Create documentation on file README.md
> - Deploy your project
> - Submission
    - Repository [Github](https://github.com/) or [Gitlab](https://gitlab.com/)
    - Postman Collection
## Requirement
1. Create RESTful API, user should able to
    a. Login and Register
    b. Add, read, update and delete product information (Protected)
2. Create API Documentation (.yaml)
## Deployment / DEMO Swagger
Deployment using render.com
[demo](https://assignment4-muchamad-syariful-umam.onrender.com/doc/)
> select servers : assignment4-muchamad-syariful-umam.onrender.com/

## Stack
The tech stack used in building RESTful API includes:
> - **express**: A fast and minimalist web framework for Node.js, providing a powerful set of features for building web applications and APIs.
> - **dotenv**: This library makes it easier to manage application configuration by using `.env` files to define environment variables, thus separating configuration from source code.
> - **boom**: This library is used to create HTTP-friendly errors in Node.js. Very useful for handling errors in web applications.
> - **joi**: A schema validation library that helps in defining and validating JavaScript object structures, especially useful for user input validation.
> - **mysql2**: A MySQL driver for Node.js that supports Promises and provides an API compatible with `mysql`. It is faster and more efficient than `mysql`.
> - **prisma**: A modern ORM (Object-Relational Mapping) for Node.js and TypeScript that simplifies interaction with databases through a powerful, type-safe query builder.
> - **lodash**: A JavaScript utility library that provides many useful functions for manipulating arrays, objects, and other data types.
> - **fs**: A built-in Node.js module that provides an interface for working with the file system, such as reading, writing, and deleting files.
> - **ioredis**: A library for interacting with Redis, a popular in-memory data store. Supports all Redis features including clusters, sentinels, and pipelines.
> - **JSONStream**: Library for working with JSON streams. Useful for processing large JSON data without having to load everything into memory.
> - **moment**: A library for manipulating and formatting dates and times in JavaScript, although it is no longer actively developed and users are advised to switch to other libraries such as `date-fns` or `Luxon`.
> - **pino**: A very fast and JSON-friendly logger for Node.js. Designed for high performance and large log volumes.
> - **bcrypt**: A library used for hashing and salting passwords in Node.js applications. It helps to enhance security by ensuring that passwords are stored in a way that makes them difficult to reverse-engineer.
> - **cookie-parser**: A middleware for parsing cookies attached to the client request object. It simplifies the process of reading and manipulating cookies in a Node.js application.
> - **cors**: A middleware that enables Cross-Origin Resource Sharing (CORS) in Node.js. It allows you to configure your server to accept requests from different origins, which is essential for APIs that are accessed from various domains.
> - **ioredis**: A robust, full-featured Redis client for Node.js. It supports both regular and cluster modes, making it a popular choice for applications that need to interact with Redis databases.
> - **jsonwebtoken**: A library for creating and verifying JSON Web Tokens (JWT). It is commonly used for handling authentication in web applications, allowing for secure transmission of information between parties.
> - **swagger-jsdoc**: A tool for generating Swagger API documentation from JSDoc comments in your code. It helps in creating and maintaining API documentation by extracting the information directly from the source code.
> - **swagger-ui-express**: A package that provides a user-friendly interface for interacting with Swagger-generated API documentation. It allows developers to visualize and test their API endpoints directly from the browser.

## Installation
1. Download or clone this repo.
2. Enter to the project directory.
3. Execute `npm install` to install the dependencies.
4. Copy `.env.example` to `.env` and set the environment variables.
5. Execute `prisma migrate dev`
6. `npm run dev`

## Configuration
Edit environment variables on .env

```env
# DATABASE
PHONEBOOK_TABLE =
MYSQL_CONFIG_HOST =
MYSQL_CONFIG_USER =
MYSQL_CONFIG_PASSWORD =
MYSQL_CONFIG_DATABASE =
MYSQL_PORT =
# JWT
ACCESS_TOKEN = 
REFRESH_TOKEN =
# REDIS
REDIS_SERVER = 
# SITE URL / CORS URL
SITE_URL =
```
## Unit Test
```
npm test
```
![unittest](https://i.ibb.co.com/1mFbC1x/Cuplikan-layar-2024-07-26-134210.webp)
## Usage
Register
```
v1/register
```
body
```
{
    "name" : string,
    "email" : string,
    "password": string,
    "confirmationPassword": string,
}
```
response
```
{
    "status": "00000",
    "message": "Success",
    "data": "User email@gmail.com has been registered",
    "transaction_id": "A3022407261329356150"
}
```
Login
```
v1/login
```
body
```
{
    "email" : string,
    "password": string,
}
```
response
```
{
    "status": "00000",
    "message": "Success",
    "data": token duration 30s (string)
    "transaction_id": string
}
```
GET Products 
```
v1/product/
```
Authorization (Bearer Token)
```
string
```
response
```json
{
    "status": "00000",
    "message": "Success",
    "data": {
        "count": 2,
        "list": [
            {
                "name": "Velocity Black Gum",
                "brand": "Compass",
                "price": 798000,
                "stock": 10
            },
            {
                "name": "Retrograde Low Triple Black",
                "brand": "Compass",
                "price": 538000,
                "stock": 10
            }
        ]
    },
    "transaction_id": "A3022407230902330820"
}
```
GET Products by id
```
v1/product/:id
```
Authorization (Bearer Token)
```
string
```
response
```json
{
    "status": "00000",
    "message": "Success",
    "data": [
        {
            "id": 2,
            "name": "Velocity Black Gum",
            "brand": "Compass",
            "price": 798000,
            "stock": 10
        }
    ],
    "transaction_id": "A3022407230903500030"
}
```
POST Products
```
v1/product/
```
Authorization (Bearer Token)
```
string
```
body
```json
{
    "name" : "Velocity Red",
    "brand": "Compass",
    "price": 598000,
    "stock": 10
}
```
response
```json
{
    "status": "00000",
    "message": "Success",
    "data": "Added 'Velocity Red' , 'Compass' , '598000' , '10' to product",
    "transaction_id": "A3022407230905287070"
}
```
PUT Products
```
v1/product/:id
```
Authorization (Bearer Token)
```
string
```
body
```json
{
    "name" : "SEPATU SAMBA OG new",
    "brand": "Adidas new",
    "price": 2200000,
    "stock": 10
}
```
response
```json
{
    "status": "00000",
    "message": "Success",
    "data": "Edited 'SEPATU SAMBA OG new' , 'Adidas new' , '2200000' , '10' to product",
    "transaction_id": "A3022407230907341680"
}
```
DELETE Products
```
v1/product/:id
```
Authorization (Bearer Token)
```
string
```
response
```json
{
    "status": "00000",
    "message": "Success",
    "data": "Delete id 17 successfully",
    "transaction_id": "A3022407230909496940"
}
```
![Database](https://i.ibb.co.com/LRWZhV7/Cuplikan-layar-2024-07-22-144022.webp)
![Diagram](https://i.ibb.co.com/qx2YrQR/API-Diagram-1.webp)
