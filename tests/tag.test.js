import request from "supertest";
import app from "../app.mjs";

const token = process.env.BEARER_TOKEN_TEST;
let tagId;

describe('Tag API', () => {
    it('should create a new tag', async () => {
        const tagData = {
            name: "study"
        };

        const response = await request(app)
            .post('/api/v1/tags')
            .set('Authorization', `Bearer ${token}`)
            .send(tagData);

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe(tagData.name);

        tagId = response.body._id;
    });

    it('should get all tags for the user', async () => {
        const response = await request(app)
            .get('/api/v1/tags')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        response.body.forEach(tag => {
            expect(tag).toHaveProperty("_id");
            expect(tag).toHaveProperty("name");
        });
    });

    it('should get a tag by ID', async () => {
        const response = await request(app)
            .get(`/api/v1/tags/${tagId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(tagId);
        expect(response.body.name).toBe("study");
    });

    it('should update a tag', async () => {
        const updatedData = {
            name: "work"
        };

        const response = await request(app)
            .put(`/api/v1/tags/${tagId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData);

        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(tagId);
        expect(response.body.name).toBe(updatedData.name);
    });

    it('should delete a tag', async () => {
        const response = await request(app)
            .delete(`/api/v1/tags/${tagId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Tag deleted successfully");

        const checkResponse = await request(app)
            .get(`/api/v1/tags/${tagId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(checkResponse.statusCode).toBe(404);
    });
});
