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
 *
 *     NewUser:
 *       type: object
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

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a specific user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/{id}/password:
 *   patch:
 *     summary: Update a user's password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /check-login:
 *   get:
 *     summary: Check if the user is logged in
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Login status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loggedIn:
 *                   type: boolean
 */



    /**
     * @swagger
     * /calculator/calculate:
     *   post:
     *     summary: Calculate irrigation recommendations
     *     tags: [Recommendations]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               selectedArea:
     *                 type: integer
     *                 example: "208"
     *                 description: The ID of the selected area
     *               areaSize:
     *                 type: number
     *                 example: "1000"
     *                 description: The size of the area
     *     responses:
     *       200:
     *         description: Calculation successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 grad:
     *                   type: number
     *                 windSpeed1mm:
     *                   type: number
     *                 maxWindSpeed:
     *                   type: number
     *                 temperature:
     *                   type: number
     *                 relativeHumidity:
     *                   type: number
     *                 deltaY:
     *                   type: number
     *                 e0:
     *                   type: number
     *                 ea:
     *                   type: number
     *                 Ea:
     *                   type: number
     *                 E:
     *                   type: number
     *                 Kc:
     *                   type: number
     *                 recommendation:
     *                   type: number
     *       500:
     *         description: Error during calculation
     */


    /**
     * @swagger
     * /check-login:
     *   get:
     *     summary: Check if the user is logged in
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: Login status
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 loggedIn:
     *                   type: boolean
     */

    /**
/**
 * @swagger
 * components:
 *   schemas:
 *     NewRecommendation:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ID of the user making the recommendation
 *         grad:
 *           type: number
 *           description: Gradient value
 *         windSpeed1mm:
 *           type: number
 *           description: Wind speed at 1mm
 *         maxWindSpeed:
 *           type: number
 *           description: Maximum wind speed
 *         temperature:
 *           type: number
 *           description: Temperature
 *         relativeHumidity:
 *           type: number
 *           description: Relative humidity
 *         deltaY:
 *           type: number
 *           description: Delta Y value
 *         e0:
 *           type: number
 *           description: E0 value
 *         ea:
 *           type: number
 *           description: Ea value
 *         Ea:
 *           type: number
 *           description: Ea value
 *         E:
 *           type: number
 *           description: E value
 *         Kc:
 *           type: number
 *           description: Kc value
 *         recommendation:
 *           type: number
 *           description: Recommendation value
 *       example:
 *         userId: "60c7c6b0b4381a4f24b9f21d"
 *         grad: 5.6
 *         windSpeed1mm: 12.5
 *         maxWindSpeed: 18.3
 *         temperature: 25.7
 *         relativeHumidity: 72.4
 *         deltaY: 4.8
 *         e0: 2.1
 *         ea: 1.5
 *         Ea: 3.6
 *         E: 0.9
 *         Kc: 1.2
 *         recommendation: 3
 *
 *     Recommendation:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID of the recommendation
 *         user:
 *           type: string
 *           description: ID of the user
 *         grad:
 *           type: number
 *           description: Gradient value
 *         windSpeed1mm:
 *           type: number
 *           description: Wind speed at 1mm
 *         maxWindSpeed:
 *           type: number
 *           description: Maximum wind speed
 *         temperature:
 *           type: number
 *           description: Temperature
 *         relativeHumidity:
 *           type: number
 *           description: Relative humidity
 *         deltaY:
 *           type: number
 *           description: Delta Y value
 *         e0:
 *           type: number
 *           description: E0 value
 *         ea:
 *           type: number
 *           description: Ea value
 *         Ea:
 *           type: number
 *           description: Ea value
 *         E:
 *           type: number
 *           description: E value
 *         Kc:
 *           type: number
 *           description: Kc value
 *         recommendation:
 *           type: number
 *           description: Recommendation value
 *       example:
 *         _id: "60c7c6b0b4381a4f24b9f21e"
 *         user: "60c7c6b0b4381a4f24b9f21d"
 *         grad: 5.6
 *         windSpeed1mm: 12.5
 *         maxWindSpeed: 18.3
 *         temperature: 25.7
 *         relativeHumidity: 72.4
 *         deltaY: 4.8
 *         e0: 2.1
 *         ea: 1.5
 *         Ea: 3.6
 *         E: 0.9
 *         Kc: 1.2
 *         recommendation: 3
 */

/**
 * @swagger
 * /calculator/recommendations:
 *   post:
 *     summary: Create a new recommendation
 *     tags: [Recommendations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewRecommendation'
 *     responses:
 *       201:
 *         description: Successfully created a new recommendation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recommendation'
 *       400:
 *         description: Bad Request - Invalid userId format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


/**
 * @swagger
 * /calculator/recommendations:
 *   get:
 *     summary: Retrieve recommendations for a specific user
 *     tags: [Recommendations]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user whose recommendations to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recommendation'
 *       400:
 *         description: Bad Request - Missing userId parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
