import request from "supertest";
import app from "../app.mjs";

let refreshToken;

describe('User Authentication', () => {
    const testUser = {
        username: 'testuser@example.com',
        password: 'testpassword'
    };

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/v1/users/register')
            .send(testUser);

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should login an existing user and return access and refresh tokens', async () => {
        const response = await request(app)
            .post('/api/v1/users/login')
            .send(testUser);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('refreshToken');

        refreshToken = response.body.refreshToken;
    });

    it('should return 401 for invalid credentials', async () => {
        const response = await request(app)
            .post('/api/v1/users/login')
            .send({
                username: 'wronguser@example.com',
                password: 'wrongpassword'
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Invalid credentials');
    });

    it('should refresh the access token using a valid refresh token', async () => {
        const response = await request(app)
            .post('/api/v1/users/refresh')
            .send({ refreshToken });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('refreshToken');

        refreshToken = response.body.refreshToken;
    });

    it('should return 403 for invalid or expired refresh token', async () => {
        const response = await request(app)
            .post('/api/v1/users/refresh')
            .send({ refreshToken: 'invalid-refresh-token' });

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe('Invalid refresh token');
    });
});
