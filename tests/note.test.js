import request from "supertest";
import { app } from "../app.mjs";

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
            ],
            "isArchived": false,
            "isPinned": false,
            "order:": 0

        }
        const response = await request(app)
            .post('/api/v1/notes')
            .set('Authorization', `Bearer ${token}`)
            .send(noteData);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(noteData.title);
        expect(response.body.content).toBe(noteData.content);
        expect(response.body.isArchived).toBe(false);

        noteId = response.body._id
    });

    it("should get all the notes for the user", async () => {
        const response = await request(app)
            .get('/api/v1/notes')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        response.body.forEach(note => {
            expect(note).toHaveProperty("isArchived");
        });
    });

    it('should toggle the archive status of a note', async () => {
        const archiveResponse = await request(app)
            .patch(`/api/v1/notes/${noteId}/archive`)
            .set('Authorization', `Bearer ${token}`);

        expect(archiveResponse.statusCode).toBe(200);
        expect(archiveResponse.body.note.isArchived).toBe(true);

        const unarchiveResponse = await request(app)
            .patch(`/api/v1/notes/${noteId}/archive`)
            .set('Authorization', `Bearer ${token}`);

        expect(unarchiveResponse.statusCode).toBe(200);
        expect(unarchiveResponse.body.note.isArchived).toBe(false);
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
            ],
            "isArchived": false,
            "isPinned": false,
            "order:": 0
        }
        const response = await request(app)
            .put(`/api/v1/notes/${noteId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData);

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(updatedData.title);
        expect(response.body.content).toBe(updatedData.content);
        expect(response.body.isArchived).toBe(false);
    });

    it('should pin a note', async () => {
        const pinResponse = await request(app)
            .patch(`/api/v1/notes/${noteId}/pin`)
            .set('Authorization', `Bearer ${token}`);

        expect(pinResponse.statusCode).toBe(200);
        expect(pinResponse.body.message).toBe("Note pinned successfully.");
        expect(pinResponse.body.note.isPinned).toBe(true);
    });

    it('should unpin a note', async () => {
        const unpinResponse = await request(app)
            .patch(`/api/v1/notes/${noteId}/pin`)
            .set('Authorization', `Bearer ${token}`);

        expect(unpinResponse.statusCode).toBe(200);
        expect(unpinResponse.body.message).toBe("Note unpinned successfully.");
        expect(unpinResponse.body.note.isPinned).toBe(false);
    });

    it('should reorder notes', async () => {
        const reorderedNotes = [
            noteId,
            "64bfbb4f2a4e5c1a12345678",
            "64bfbb4f2a4e5c1a87654321"
        ];

        const response = await request(app)
            .patch('/api/v1/notes/reorder')
            .set('Authorization', `Bearer ${token}`)
            .send({ orderedNotes: reorderedNotes });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Notes ordered successfully.");
    });

    it('should delete a note', async () => {
        const response = await request(app)
            .delete(`/api/v1/notes/${noteId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    })

});