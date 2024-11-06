import request from "supertest";
import app from "../app.mjs";


describe('User Authentication', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/v1/users/register')
            .send({
                username: 'testuser@example.com',
                password: 'testpassword'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should login an existing user and return a token', async () => {
        const userPayload = {
            username: 'testuser@example.com',
            password: 'testpassword'
        };


        const response = await request(app)
            .post('/api/v1/users/login')
            .send(userPayload);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
        const response = await request(app)
            .post('/api/v1/users/login')
            .send({
                username: 'wronguser@example.com',
                password: 'wrongpassword'
            });
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Invalid credentials')
    })
});