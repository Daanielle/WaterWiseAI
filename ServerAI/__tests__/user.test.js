const request = require('supertest');
const app = require('../server.js'); // Path to your Express app
const mongoose = require('mongoose');
const User = require('../models/user');

describe('POST /check-email', () => {
    beforeAll(async () => {
        // Connect to the database
        const url = `mongodb://localhost:27017/WaterWiseDB`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    // beforeEach(async () => {
    //     // Clear the User collection before each test
    //     await User.deleteMany({});
    // });

    afterAll(async () => {
        // Disconnect from the database
        await mongoose.connection.close();
    });

    test('should return exists: true if the email exists in the database', async () => {
        const email = 'johndoe@gmail.com';

        // Mock the findOne method of User model to simulate an existing user
        jest.spyOn(User, 'findOne').mockImplementation(async () => {
            return { email }; // Simulate finding a user with the specified email
        });

        const response = await request(app)
            .post('/users/check-email')
            .send({ email });

        expect(response.status).toBe(200);
        expect(response.body.exists).toBe(true);
    });

    // test('should return exists: false if the email does not exist in the database', async () => {
    //     const email = 'notfound@example.com';

    //     // Mock the findOne method of User model to simulate not finding any user
    //     jest.spyOn(User, 'findOne').mockImplementation(async () => {
    //         return null; // Simulate no user found with the specified email
    //     });

    //     const response = await request(app)
    //         .post('/check-email')
    //         .send({ email });

    //     expect(response.status).toBe(200);
    //     expect(response.body.exists).toBe(false);
    // });

    // test('should return status 500 if there is a server error', async () => {
    //     // Mock the findOne method of User model to throw an error
    //     jest.spyOn(User, 'findOne').mockImplementation(() => {
    //         throw new Error('Database error');
    //     });

    //     const response = await request(app)
    //         .post('/check-email')
    //         .send({ email: 'example.com' });

    //     expect(response.status).toBe(500);
    //     expect(response.body.message).toBe('Database error');
    // });
});
