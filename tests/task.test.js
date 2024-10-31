import request from "supertest";
import app from "../app.mjs";

const token = process.env.BEARER_TOKEN_TEST
let taskId;

describe('Task API', () => {
    it('should create a new task', async () => {
        const taskData = {
            title: "Study Node.js",
            description: "Complete the Node.js API project",
            dueDate: "2024-11-02"
        };

        const response = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(taskData);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(taskData.title);
        expect(response.body.description).toBe(taskData.description);

        taskId = response.body._id
    });

    it("should get all the tasks for the user", async () => {
        const response = await request(app)
            .get('/api/tasks')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should update a task', async () => {
        const updatedData = {
            title: "Study Node.js - Uptaded",
            description: 'Complete the Node.js API project and update the docs',
        };

        const response = await request(app)
            .put(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData);

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(updatedData.title);
        expect(response.body.description).toBe(updatedData.description);
    });

    it('should delete a task', async () => {
        const response = await request(app)
            .delete(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    })

});