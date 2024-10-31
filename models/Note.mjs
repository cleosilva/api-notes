import mongoose from "mongoose";

const ckeckListItemSchema = new mongoose.Schema({
    item: { type: String, required: true },
    done: { type: Boolean, default: false }
})

const noteschema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: false }, // Conteúdo da nota
    tags: [{ type: String }], // Etiqueta (tags)
    color: { type: String, default: '#ffffff' }, // Cor da nota, padrão branca
    checklist: [ckeckListItemSchema],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Note = mongoose.model('Note', noteschema);