export const CheckListItem = {
    type: 'object',
    properties: {
        item: { type: 'string' },
        done: { type: 'boolean' },
    },
    required: ['item'],
};

export const Note = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        title: { type: 'string' },
        content: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
        color: { type: 'string', default: '#ffffff' },
        checklist: { type: 'array', items: { $ref: '#/components/schemas/CheckListItem' } },
        userId: { type: 'string' },
        isArchived: { type: 'boolean', default: false },
        isPinned: { type: 'boolean', default: false },
        order: { type: 'number', default: 0 },
        reminder: { type: 'string', format: 'date-time' },
        notified: { type: 'boolean', default: false },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
    },
    required: ['title', 'userId'],
};
