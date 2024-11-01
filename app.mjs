import 'dotenv/config'
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db.mjs';
import userRoutes from './routes/userRoutes.mjs';
import taskRoutes from './routes/noteRoutes.mjs'
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import logger from './utils/logger.mjs';

const app = express();
connectDB();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
})


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/notes', taskRoutes);


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Notes API',
            version: '1.0.0',
            description: 'API para gerenciamento de notas com filtros avançados',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}/api/v1`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                CheckListItem: {
                    type: 'object',
                    properties: {
                        item: { type: 'string' },
                        done: { type: 'boolean' }
                    },
                    required: ['item']
                },
                Note: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        title: { type: 'string' },
                        content: { type: 'string' },
                        tags: {
                            type: 'array',
                            items: { type: 'string' }
                        },
                        color: { type: 'string', default: '#ffffff' },
                        checklist: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/CheckListItem' }
                        },
                        userId: { type: 'string' },
                        archived: { type: 'boolean', default: false },
                        order: { type: Number, default: 0 },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                    required: ['title', 'userId']
                }
            }
        }
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