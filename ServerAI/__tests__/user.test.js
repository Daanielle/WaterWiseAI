const request = require('supertest');
const app = require('../server.js'); // Path to your Express app
// const server = require('../server.js'); // Path to your Express app

const User = require('../models/user');

describe('POST /check-email', () => {
    test('should return exists: true if the email exists in the database', async () => {
        const email = 'johndoe@gmail.com';

        // Mock the findOne method of User model to simulate an existing user
        jest.spyOn(User, 'findOne').mockResolvedValue({ email });

        const response = await request(app)
            .post('/users/check-email')
            .send({ email });

        expect(response.status).toBe(200);
        expect(response.body.exists).toBe(true);
    });

    test('should return exists: false if the email does not exist in the database', async () => {
        const email = 'notfound@example.com';

        // Mock the findOne method of User model to simulate not finding any user
        jest.spyOn(User, 'findOne').mockResolvedValue(null);

        const response = await request(app)
            .post('/users/check-email')
            .send({ email });

        expect(response.status).toBe(200);
        expect(response.body.exists).toBe(false);
    });

});
