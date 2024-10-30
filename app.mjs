import 'dotenv/config'
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db.mjs';
import userRoutes from './routes/userRoutes.mjs';
import taskRoutes from './routes/taskRoutes.mjs'
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const app = express();
connectDB();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Swagger definitions
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task API',
            version: '1.0.0',
            description: 'API para gerenciamento de usuários e tarefas',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}/api`, // URL do servidor
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Formato do token
                },
            },
        },
    },
    apis: ['./routes/*.mjs'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;



if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on PORT:${PORT}`);
    });
}

export default app;