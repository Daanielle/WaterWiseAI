/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and login
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - _id
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID
 *         firstName:
 *           type: string
 *           description: First name of the user
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *         email:
 *           type: string
 *           description: Email address of the user
 *         image:
 *           type: string
 *           description: URL of the user's profile image
 *       example:
 *         _id: "60c72b2f9b1e8b3a6c9a1a2b"
 *         firstName: "John"
 *         lastName: "Doe"
 *         email: "johndoe@gmail.com"
 *         image: "https://example.com/johndoe.jpg"
 *
 *     NewUser:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           example: johndoe@gmail.com
 *         image:
 *           type: string
 *           example: https://example.com/johndoe.jpg
 *         password:
 *           type: string
 *           example: newPassword123
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal Server Error
 */

// /**
//  * @swagger
//  * /users/{id}:
//  *   get:
//  *     summary: Retrieve a specific user by ID
//  *     tags: [Users]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The user ID
//  *     responses:
//  *       200:
//  *         description: The user data
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/User'
//  *       404:
//  *         description: User not found
//  *       500:
//  *         description: Internal Server Error
//  */

// /**
//  * @swagger
//  * /users/register:
//  *   post:
//  *     summary: Register a new user
//  *     tags: [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/NewUser'
//  *     responses:
//  *       201:
//  *         description: User created successfully
//  *       400:
//  *         description: Invalid input
//  *       500:
//  *         description: Internal Server Error
//  */

// /**
//  * @swagger
//  * /users/{id}:
//  *   patch:
//  *     summary: Update a user
//  *     tags: [Users]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The user ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/User'
//  *     responses:
//  *       200:
//  *         description: User updated successfully
//  *       400:
//  *         description: Invalid input
//  *       404:
//  *         description: User not found
//  *       500:
//  *         description: Internal Server Error
//  */

// /**
//  * @swagger
//  * /users/{id}/password:
//  *   patch:
//  *     summary: Update a user's password
//  *     tags: [Users]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The user ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               password:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Password updated successfully
//  *       400:
//  *         description: Invalid input
//  *       404:
//  *         description: User not found
//  *       500:
//  *         description: Internal Server Error
//  */

// /**
//  * @swagger
//  * /users/{id}:
//  *   delete:
//  *     summary: Delete a user
//  *     tags: [Users]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The user ID
//  *     responses:
//  *       200:
//  *         description: User deleted successfully
//  *       404:
//  *         description: User not found
//  *       500:
//  *         description: Internal Server Error
//  */

// /**
//  * @swagger
//  * /users/login:
//  *   post:
//  *     summary: User login
//  *     tags: [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: johndoe@gmail.com
//  *               password:
//  *                 type: string
//  *                 example: newPassword123
//  *     responses:
//  *       200:
//  *         description: Login successful
//  *       400:
//  *         description: Invalid email or password
//  *       500:
//  *         description: Server error
//  */

