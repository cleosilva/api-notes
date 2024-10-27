import 'dotenv/config'
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db.mjs';
import userRoutes from './routes/userRoutes.mjs';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const app = express();

connectDB();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api/users', userRoutes);

// Swagger definitions
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
            description: 'API for user registration and authentication',
        },
    },
    apis: ['./routes/*.mjs'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;

export const startServer = async () => {
    return new Promise((resolve) => {
        const server = app.listen(PORT, () => {
            console.log(`Server running on PORT:${PORT}`);
            resolve(server);
        })
    })
};

//startServer();

export const stopServer = async (server) => {
    return new Promise((resolve) => {
        server.close(() => {
            console.log('Server closed');
            resolve();
        })
    })
};

