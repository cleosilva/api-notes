import { Server } from 'socket.io';

export default function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        },
    });

    io.on('connection', (socket) => {
        console.log('A user has logged in', socket.id);

        socket.on('disconnect', (reason) => {
            console.log("User disconnected:", socket.id, "Reason:", reason);
        });
    });

    return io;
}
