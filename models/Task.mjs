import mongoose from "mongoose";

const ckeckListItemSchema = new mongoose.Schema({
    text: { type: String, required: true },
    checked: { type: Boolean, default: false }
})

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: false }, // Conteúdo da nota
    labels: [{ type: String }], // Etiqueta (tags)
    color: { type: String, default: '#ffffff' }, // Cor da nota, padrão branca
    checklist: [ckeckListItemSchema],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Task = mongoose.model('Task', taskSchema);