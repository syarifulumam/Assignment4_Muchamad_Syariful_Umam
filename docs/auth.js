/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'admin'
 *               email:
 *                 type: string
 *                 example: 'admin@gmail.com'
 *               password:
 *                 type: string
 *                 example: 'password'
 *               confirmationPassword:
 *                 type: string
 *                 example: 'password'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               success:
 *                 summary: Successful registration
 *                 value:
 *                   status: '00000'
 *                   message: Success
 *                   data: User admin@gmail.com has been registered
 *                   transaction_id: A3022407260238591280
 *       400:
 *         description: Bad Request - The request parameters are invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               badRequest:
 *                 summary: Invalid request
 *                 value:
 *                   status: 400
 *                   message: "\"name\" is required"
 *                   error: Bad Request
 *                   transaction_id: A3022407260242395440
 *       409:
 *         description: Conflict - Username already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               conflict:
 *                 summary: User already exists
 *                 value:
 *                   status: 409
 *                   message: User with email admin99@gmail.com already exists
 *                   error: Conflict
 *                   transaction_id: A3022407260245249800
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               internalError:
 *                 summary: Server error
 *                 value:
 *                   status: 500
 *                   message: An internal server error occurred
 *                   error: Internal Server Error
 *                   transaction_id: A3022407251010424070
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: 'admin@gmail.com'
 *               password:
 *                 type: string
 *                 example: 'password'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               success:
 *                 summary: Successful login
 *                 value:
 *                   status: '00000'
 *                   message: Success
 *                   data: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwidXNlckVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzIxOTYyMzY5LCJleHAiOjE3MjE5NjIzODl9.jdSShwY9mIbszWk02YkLgcgbvf0Gfje8j6XJdy6waFg
 *                   transaction_id: A3022407260252478610
 *       400:
 *         description: Bad Request - The request parameters are invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               badRequest:
 *                 summary: Invalid request
 *                 value:
 *                   status: 400
 *                   message: "\"email\" is not allowed to be empty"
 *                   error: Bad Request
 *                   transaction_id: A3022407260254019610
 *       404:
 *         description: Not Found - User with this email not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               notFound:
 *                 summary: User not found
 *                 value:
 *                   status: 404
 *                   message: User with email 1admin@gmail.com not found
 *                   error: Not Found
 *                   transaction_id: A3022407260959163400
 *       401:
 *         description: Unauthorized - Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               unauthorized:
 *                 summary: Invalid credentials
 *                 value:
 *                   status: 401
 *                   message: Invalid email or password
 *                   error: Unauthorized
 *                   transaction_id: A3022407261009497180
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               internalError:
 *                 summary: Server error
 *                 value:
 *                   status: 500
 *                   message: An internal server error occurred
 *                   error: Internal Server Error
 *                   transaction_id: A3022407251010424070
 */
