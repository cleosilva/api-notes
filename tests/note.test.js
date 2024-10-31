import request from "supertest";
import app from "../app.mjs";

const token = process.env.BEARER_TOKEN_TEST
let noteId;

describe('note API', () => {
    it('should create a new note', async () => {
        const noteData = {
            "title": "Revisão de JavaScript",
            "content": "Estudar closures e promises",
            "tags": [
                "estudo",
                "javascript"
            ],
            "color": "#FFDDC1",
            "checklist": [
                {
                    "item": "Entender async/await",
                    "done": false
                }
            ]
        }
        const response = await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send(noteData);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(noteData.title);
        expect(response.body.content).toBe(noteData.content);

        noteId = response.body._id
    });

    it("should get all the notes for the user", async () => {
        const response = await request(app)
            .get('/api/notes')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should update a note', async () => {
        const updatedData = {
            "title": "Revisão de JavaScript - Updated",
            "content": "Estudar closures e promises",
            "tags": [
                "estudo",
                "javascript"
            ],
            "color": "#FFDDC1",
            "checklist": [
                {
                    "item": "Entender async/await",
                    "done": false
                }
            ]
        }
        const response = await request(app)
            .put(`/api/notes/${noteId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData);

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(updatedData.title);
        expect(response.body.content).toBe(updatedData.content);
    });

    it('should delete a note', async () => {
        const response = await request(app)
            .delete(`/api/notes/${noteId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    })

});