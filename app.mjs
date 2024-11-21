import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import userRoutes from './routes/userRoutes.mjs';
import taskRoutes from './routes/noteRoutes.mjs';
import tagRoutes from './routes/tagRoutes.mjs';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger/swaggerConfig.mjs';
import logMiddleware from './middlewares/logMiddleware.mjs';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(logMiddleware);

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/notes', taskRoutes);
app.use('/api/v1/tags', tagRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app; 
