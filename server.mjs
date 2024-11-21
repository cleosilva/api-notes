import 'dotenv/config';
import http from 'http';
import initializeSocket from './websockets/socketServer.mjs';
import connectDB from './config/db.mjs';
import checkReminders from './utils/reminderUtils.mjs';
import app from './app.mjs';


connectDB().then(() => {
    checkReminders();
}).catch(err => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
});

const server = http.createServer(app);
const io = initializeSocket(server);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
    server.listen(PORT, () => {
        console.log(`Server running on PORT:${PORT}`);
    });
}

export { server, app, io };
