/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/v1/product:
 *   get:
 *     tags: [Products]
 *     description: ''
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: OK
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
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                     list:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           brand:
 *                             type: string
 *                           price:
 *                             type: integer
 *                           stock:
 *                             type: integer
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   status: '00000'
 *                   message: Success
 *                   data:
 *                     count: 2
 *                     list:
 *                       - name: Velocity White
 *                         brand: Compass
 *                         price: 198000
 *                         stock: 15
 *                       - name: Velocity Black
 *                         brand: Compass
 *                         price: 598000
 *                         stock: 15
 *                   transaction_id: A3022407261017392020
 *       403:
 *         description: Forbidden - invalid token
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
 *             examples:
 *               forbidden:
 *                 summary: Invalid token
 *                 value:
 *                   status: 403
 *                   message: Forbidden
 *                   error: Forbidden
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
 * /api/v1/product:
 *   post:
 *     tags: [Products]
 *     description: ''
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       description: 'Add Product'
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Velocity White
 *               brand:
 *                 type: string
 *                 example: Compass
 *               price:
 *                 type: integer
 *                 example: 198000
 *               stock:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Operation completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: '00000'
 *                 message:
 *                   type: string
 *                   example: 'Success'
 *                 data:
 *                   type: string
 *                   example: "Added 'Velocity ABC' , 'Compass' , '198000' , '10' to product"
 *                 transaction_id:
 *                   type: string
 *                   example: 'A3022407261017188290'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   status: '00000'
 *                   message: 'Success'
 *                   data: "Added 'Velocity ABC' , 'Compass' , '198000' , '10' to product"
 *                   transaction_id: 'A3022407261017188290'
 *       403:
 *         description: Forbidden - invalid token
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
 *             examples:
 *               forbidden:
 *                 summary: Invalid token
 *                 value:
 *                   status: 403
 *                   message: Forbidden
 *                   error: Forbidden
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
 *                   message: "\"name\" is not allowed to be empty"
 *                   error: Bad Request
 *                   transaction_id: A3022407260254019610
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
 * /api/v1/product/{id}:
 *   get:
 *     summary: Retrieve a product by its ID
 *     tags: [Products]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
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
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                     list:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           brand:
 *                             type: string
 *                           price:
 *                             type: integer
 *                           stock:
 *                             type: integer
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   status: '00000'
 *                   message: Success
 *                   data:
 *                     count: 1
 *                     list:
 *                       - name: Velocity White
 *                         brand: Compass
 *                         price: 198000
 *                         stock: 15
 *                   transaction_id: A3022407261017392020
 *       403:
 *         description: Forbidden - invalid token
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
 *             examples:
 *               forbidden:
 *                 summary: Invalid token
 *                 value:
 *                   status: 403
 *                   message: Forbidden
 *                   error: Forbidden
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
 *                 summary: Invalid request parameters
 *                 value:
 *                   status: 400
 *                   message: "\"id\" must be a number"
 *                   error: Bad Request
 *                   transaction_id: A3022407260254019610
 *       404:
 *         description: Not Found - Product not found
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
 *                 summary: Product not found
 *                 value:
 *                   status: 404
 *                   message: Product with id 99 not found
 *                   error: Not Found
 *                   transaction_id: A3022407261048041580
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
 *   put:
 *     summary: Update a product by its ID
 *     tags: [Products]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: body
 *         in: body
 *         description: Edit Product
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Velocity Black
 *                 brand:
 *                   type: string
 *                   example: Compass
 *                 price:
 *                   type: integer
 *                   example: 198000
 *                 stock:
 *                   type: integer
 *                   example: 10
 *     responses:
 *       200:
 *         description: Successful response - Operation completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: '00000'
 *                 message:
 *                   type: string
 *                   example: 'Success'
 *                 data:
 *                   type: string
 *                   example: "Edited 'Velocity Black' , 'Compass' , '198000' , '10' to product"
 *                 transaction_id:
 *                   type: string
 *                   example: 'A3022407261017188290'
 *             examples:
 *               success:
 *                 summary: Successful update
 *                 value:
 *                   status: '00000'
 *                   message: Success
 *                   data: "Edited 'Velocity Black' , 'Compass' , '198000' , '10' to product"
 *                   transaction_id: 'A3022407261017188290'
 *       403:
 *         description: Forbidden - invalid token
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
 *             examples:
 *               forbidden:
 *                 summary: Invalid token
 *                 value:
 *                   status: 403
 *                   message: Forbidden
 *                   error: Forbidden
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
 *                 summary: Invalid request parameters
 *                 value:
 *                   status: 400
 *                   message: "\"name\" is not allowed to be empty"
 *                   error: Bad Request
 *                   transaction_id: A3022407260254019610
 *       404:
 *         description: Not Found - Product not found
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
 *                 summary: Product not found
 *                 value:
 *                   status: 404
 *                   message: Product with id 99 not found
 *                   error: Not Found
 *                   transaction_id: A3022407261048041580
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
 *   delete:
 *     summary: Delete a product by its ID
 *     tags: [Products]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
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
 *                 summary: Successful deletion
 *                 value:
 *                   status: '00000'
 *                   message: Success
 *                   data: Delete id 1 successfully
 *                   transaction_id: A3022407261017392020
 *       403:
 *         description: Forbidden - invalid token
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
 *             examples:
 *               forbidden:
 *                 summary: Invalid token
 *                 value:
 *                   status: 403
 *                   message: Forbidden
 *                   error: Forbidden
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
 *                 summary: Invalid request parameters
 *                 value:
 *                   status: 400
 *                   message: "\"id\" must be a number"
 *                   error: Bad Request
 *                   transaction_id: A3022407260254019610
 *       404:
 *         description: Not Found - Product not found
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
 *                 summary: Product not found
 *                 value:
 *                   status: 404
 *                   message: Product with id 99 not found
 *                   error: Not Found
 *                   transaction_id: A3022407261048041580
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
