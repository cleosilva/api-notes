import request from "supertest";
import app from "../app.mjs";


describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWU5NGRlNDcxMWM1MmNmNGEyM2JjNyIsImlhdCI6MTczMDEyNDQ3NiwiZXhwIjoxNzMwMTI4MDc2fQ.HK76CwjViUJVWslJN2kNMdIpldw42WNAMmwGKwJvWbI";
        const taskData = {
            title: "Study Java",
            description: "Complete the Java API project",
            dueDate: "2024-11-02"
        };

        const response = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(taskData);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(taskData.title);
        expect(response.body.description).toBe(taskData.description);
    });
});