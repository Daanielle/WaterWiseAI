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
 *           example: 66697a16bcd943393430ab2d
 *           description: The user ID
 *         firstName:
 *           type: string
 *           example: John
 *           description: First name of the user
 *         lastName:
 *           type: string
 *           example: Doe
 *           description: Last name of the user
 *         email:
 *           type: string
 *           example: https://example.com/johndoe.jpg
 *           description: Email address of the user
 *         image:
 *           type: string
 *           example: https://example.com/johndoe.jpg
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
 *                 default: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 default: newPassword123
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
 *                 type: string
 *                 example: "381"
 *                 description: The ID of the selected area
 *               areaSize:
 *                 type: number
 *                 example: 100
 *                 description: The size of the area
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-26"
 *                 description: The date for the calculation in YYYY-MM-DD format
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
 *                   example: 1042
 *                 windSpeed1mm:
 *                   type: number
 *                   example: 5
 *                 maxWindSpeed:
 *                   type: number
 *                   example: 5.6
 *                 temperature:
 *                   type: number
 *                   example: 33.8
 *                 relativeHumidity:
 *                   type: number
 *                   example: 38
 *                 deltaY:
 *                   type: number
 *                   example: 0.2149
 *                 e0:
 *                   type: number
 *                   example: 53.30351671933922
 *                 ea:
 *                   type: number
 *                   example: 20.255336353348905
 *                 Ea:
 *                   type: number
 *                   example: 13.587208554470816
 *                 E:
 *                   type: number
 *                   example: 11.183808252019013
 *                 Kc:
 *                   type: number
 *                   example: 1.3
 *                 recommendation:
 *                   type: number
 *                   example: 1453.8950727624717
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     NewRecommendation:
 *       type: object
 *       properties:
 *         recommendation:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               description: ID of the user making the recommendation
 *             grad:
 *               type: number
 *               description: Gradient value
 *             windSpeed1mm:
 *               type: number
 *               description: Wind speed at 1mm
 *             maxWindSpeed:
 *               type: number
 *               description: Maximum wind speed
 *             temperature:
 *               type: number
 *               description: Temperature
 *             relativeHumidity:
 *               type: number
 *               description: Relative humidity
 *             deltaY:
 *               type: number
 *               description: Delta Y value
 *             e0:
 *               type: number
 *               description: E0 value
 *             ea:
 *               type: number
 *               description: Ea value
 *             Ea:
 *               type: number
 *               description: Ea value
 *             E:
 *               type: number
 *               description: E value
 *             Kc:
 *               type: number
 *               description: Kc value
 *             recommendation:
 *               type: number
 *               description: Recommendation value
 *             station:
 *               type: string
 *               description: Station name
 *       example:
 *         recommendation:
 *           userId: "60c7c6b0b4381a4f24b9f21d"
 *           grad: 999
 *           windSpeed1mm: 9
 *           maxWindSpeed: 9.6
 *           temperature: 34.9
 *           relativeHumidity: 32
 *           deltaY: 0.2149
 *           e0: 56.65865187344365
 *           ea: 18.13076859950197
 *           Ea: 25.549123661726526
 *           E: 21.029816238794172
 *           Kc: 1.3
 *           recommendation: 2733.8761110432424
 *           station: "200"
 *
 *     Recommendation:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID of the recommendation
 *         userId:
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
 *         station:
 *           type: string
 *           description: Station name
 *       example:
 *         _id: "667bfabc9d4fb23a7268d158"
 *         userId: "666ab63df170b9b3fdbd2f46"
 *         grad: 999
 *         windSpeed1mm: 9
 *         maxWindSpeed: 9.6
 *         temperature: 34.9
 *         relativeHumidity: 32
 *         deltaY: 0.2149
 *         e0: 56.65865187344365
 *         ea: 18.13076859950197
 *         Ea: 25.549123661726526
 *         E: 21.029816238794172
 *         Kc: 1.3
 *         recommendation: 2733.8761110432424
 *         station: "200"
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


/**
 * @swagger
 * /calculator/recommendations/{recommendationId}:
 *   get:
 *     summary: Retrieve a single recommendation by recommendationId
 *     tags: [Recommendations]
 *     parameters:
 *       - in: path
 *         name: recommendationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the recommendation to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the recommendation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recommendation'
 *       400:
 *         description: Bad Request - Invalid recommendationId format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Recommendation not found
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
 * /forum/newMessage:
 *   post:
 *     summary: Add a new forum message
 *     tags: 
 *       - Forum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user creating the message
 *                 example: "60c7c6b0b4381a4f24b9f21d"
 *               title:
 *                 type: string
 *                 description: Title of the forum message
 *                 example: "My First Forum Post"
 *               body:
 *                 type: string
 *                 description: Body of the forum message
 *                 example: "This is the body of my first forum post."
 *               recommendations:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Array of recommendation IDs
 *                   example:
 *                     - "667c02c026bd6faa88772901"
 *     responses:
 *       201:
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: "60c7c6b0b4381a4f24b9f21d"
 *                 title:
 *                   type: string
 *                   example: "My First Forum Post"
 *                 body:
 *                   type: string
 *                   example: "This is the body of my first forum post."
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example:
 *                       - "667c02c026bd6faa88772901"
 *                       - "667c01e0bc889c4bd3c56bea"
 *       400:
 *         description: Bad Request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
*/

/**
 * @swagger
 * /forum/messages/{messageId}/comments:
 *   post:
 *     summary: Add a new comment to a forum message
 *     tags: [Forum]
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the forum message to add the comment to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user creating the comment
 *                 example: "60c72b2f9b1d8e30d4c8b459"
 *               image:
 *                 type: string
 *                 description: URL of the image associated with the comment
 *                 example: "https://example.com/comment-image.jpg"
 *               title:
 *                 type: string
 *                 description: Title of the comment
 *                 example: "Interesting point!"
 *               body:
 *                 type: string
 *                 description: Body of the comment
 *                 example: "I really like your post!"
 *     responses:
 *       201:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID of the created comment
 *                   example: "60c72b2f9b1d8e30d4c8b458"
 *                 userId:
 *                   type: string
 *                   description: ID of the user who created the comment
 *                   example: "60c72b2f9b1d8e30d4c8b459"
 *                 title:
 *                   type: string
 *                   description: Title of the comment
 *                   example: "Interesting point!"
 *                 body:
 *                   type: string
 *                   description: Body of the comment
 *                   example: "I really like your post!"
 *                 message:
 *                   type: string
 *                   description: ID of the forum message this comment is related to
 *                   example: "60c72b2f9b1d8e30d4c8b457"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Creation timestamp
 *                   example: "2023-06-19T12:00:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last update timestamp
 *                   example: "2023-06-19T12:00:00.000Z"
 *       400:
 *         description: Bad Request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       404:
 *         description: Not Found - Message not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /forum/messages:
 *   get:
 *     tags:
 *       - Forum
 *     summary: Get all forum messages ordered by newest to oldest
 *     description: Retrieve all forum messages, sorted by creation date in descending order (newest first).
 *     responses:
 *       200:
 *         description: A list of forum messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Message ID
 *                     example: "60c72b2f9b1e8b3a6c9a1a2b"
 *                   content:
 *                     type: string
 *                     description: The content of the message
 *                     example: "This is a forum message."
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Creation timestamp
 *                     example: "2023-06-19T12:00:00.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Last update timestamp
 *                     example: "2023-06-19T12:00:00.000Z"
 *       400:
 *         description: Bad Request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid request parameters."
 *       404:
 *         description: Not Found - Message not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Messages not found."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal server error."
 */
/**

/**
 * @swagger
 * /forum/messages/{messageId}/comments:
 *   get:
 *     summary: Get all comments for a specific message ordered by createdAt (newest to oldest)
 *     tags:
 *       - Forum
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the message to retrieve comments for
 *         example: "60c72b2f9b1e8b3a6c9a1a2b"
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Comment ID
 *                     example: "60c72b2f9b1e8b3a6c9a1a2c"
 *                   content:
 *                     type: string
 *                     description: The content of the comment
 *                     example: "This is a comment."
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Creation timestamp
 *                     example: "2023-06-19T12:00:00.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Last update timestamp
 *                     example: "2023-06-19T12:00:00.000Z"
 *       400:
 *         description: Bad Request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid message ID."
 *       404:
 *         description: Not Found - Comments not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comments not found for the message ID."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
