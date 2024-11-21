import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db.mjs';
import userRoutes from './routes/userRoutes.mjs';
import taskRoutes from './routes/noteRoutes.mjs';
import tagRoutes from './routes/tagRoutes.mjs';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger/swaggerConfig.mjs';
import swaggerJsDoc from 'swagger-jsdoc';
import logger from './utils/logger.mjs';
import http from 'http';
import checkReminders from './utils/reminderUtils.mjs';
import logMiddleware from './middlewares/logMiddleware.mjs';
import initializeSocket from './websockets/socketServer.mjs';

const app = express();
const server = http.createServer(app);
const io = initializeSocket(server);

connectDB().then(() => {
    checkReminders();
}).catch(err => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
});

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(logMiddleware);

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/notes', taskRoutes);
app.use('/api/v1/tags', tagRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
    server.listen(PORT, () => {
        console.log(`Server running on PORT:${PORT}`);
    });
}

export { server, app, io };
