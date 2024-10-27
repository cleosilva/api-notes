import 'dotenv/config'
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db.mjs';
import userRoutes from './routes/userRoutes.mjs';

const app = express();

connectDB();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api/users', userRoutes);



const PORT = process.env.PORT || 3000;

export const startServer = async () => {
    return new Promise((resolve) => {
        const server = app.listen(PORT, () => {
            console.log(`Server running on PORT:${PORT}`);
            resolve(server);
        })
    })
};

export const stopServer = async (server) => {
    return new Promise((resolve) => {
        server.close(() => {
            console.log('Server closed');
            resolve();
        })
    })
};