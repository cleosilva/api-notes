import request from "supertest";
import mongoose from "mongoose";
import { startServer, stopServer } from "../app.mjs";

let server;

beforeAll(async () => {
    server = await startServer();
});

afterAll(async () => {
    await mongoose.connection.close();
    await stopServer(server);
})

describe('User Authentication', () => {
    it('should register a new user', async () => {
        const response = await request(server)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should login an existing user and return a token', async () => {
        const userPayload = {
            username: 'testuser',
            password: 'testpassword'
        };

        //await User.create(userPayload);

        const response = await request(server)
            .post('/api/users/login')
            .send(userPayload);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
        const response = await request(server)
            .post('/api/users/login')
            .send({
                username: 'wronguser',
                password: 'wrongpassword'
            });
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Invalid credentials')
    })
});