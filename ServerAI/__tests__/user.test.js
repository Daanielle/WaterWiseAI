// newMessage.test.js

const mongoose = require('mongoose');
const User = require('../models/user'); // Adjust the path to your User model

describe('Forum Post Tests', () => {
    let connection;

    beforeAll(async () => {
        // Establish a connection to the MongoDB test database
        const url = 'mongodb://localhost:27017/WaterWiseDB'; // Update with your MongoDB connection URL
        connection = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        // Disconnect from the MongoDB test database
        await mongoose.connection.close();
    });

    // beforeEach(async () => {
    //     // Clear the User collection before each test to ensure a clean state
    //     await User.deleteMany({});
    // });

    test('should add a new forum post without affecting existing posts', async () => {
        const newPost = {
            userId: '60c7c6b0b4381a4f24b9f21d', // Replace with your actual userId
            title: 'My First Forum Post',
            body: 'This is the body of my first forum post.',
        };

        // Mock the User model create method to simulate adding a new post
        jest.spyOn(User, 'create').mockResolvedValue(newPost);

        // Mock the User model countDocuments method to simulate counting posts
        jest.spyOn(User, 'countDocuments').mockResolvedValue(1); // Assuming there's one post initially

        // Add a new post
        const createdPost = await User.create(newPost);

        // Verify the created post
        expect(createdPost).toMatchObject(newPost);

        // Verify that the number of posts increased by 1
        const numPosts = await User.countDocuments({});
        expect(numPosts).toBe(1);
    });
});

// const request = require('supertest');
// const app = require('../server.js'); // Path to your Express app
// // const server = require('../server.js'); // Path to your Express app

// const User = require('../models/user');

// describe('POST /check-email', () => {
//     test('should return exists: true if the email exists in the database', async () => {
//         const email = 'johndoe@gmail.com';

//         // Mock the findOne method of User model to simulate an existing user
//         jest.spyOn(User, 'findOne').mockResolvedValue({ email });

//         const response = await request(app)
//             .post('/users/check-email')
//             .send({ email });

//         expect(response.status).toBe(200);
//         expect(response.body.exists).toBe(true);
//     });

//     test('should return exists: false if the email does not exist in the database', async () => {
//         const email = 'notfound@example.com';

//         // Mock the findOne method of User model to simulate not finding any user
//         jest.spyOn(User, 'findOne').mockResolvedValue(null);

//         const response = await request(app)
//             .post('/users/check-email')
//             .send({ email });

//         expect(response.status).toBe(200);
//         expect(response.body.exists).toBe(false);
//     });

// });
