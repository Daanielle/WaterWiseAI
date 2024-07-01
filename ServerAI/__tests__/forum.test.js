// newMessage.test.js

const request = require('supertest');
const app = require('../server.js'); // Adjust the path to your Express app
const User = require('../models/forumMessage'); // Adjust the path to your User model

describe('POST /forum/newMessage', () => {
    let initialNumOfMessages = 0;

    beforeAll(() => {
        // Simulate fetching initial number of messages from the database
        jest.spyOn(User, 'countDocuments').mockImplementation(async () => {
            return initialNumOfMessages;
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
    });

    test('should add a new forum post without affecting existing posts', async () => {
        const newPost = {
            userId: '6682e9f2024fefdb81c4a777', // Replace with your actual userId
            title: 'My First Forum Post',
            body: 'This is the body of my first forum post 1.'
        };

        const response = await request(app)
            .post('/forum/newMessage')
            .send(newPost);

        expect(response.status).toBe(201); // Assuming your server responds with 201 Created

        // Verify that the number of messages/posts increased by 1
        const numMessages = await User.countDocuments({});
        expect(numMessages).toBe(initialNumOfMessages);
    });
});
