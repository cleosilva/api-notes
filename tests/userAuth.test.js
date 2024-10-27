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
    })
});