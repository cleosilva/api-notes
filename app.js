import 'dotenv/config'
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

connectDB();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api/users', userRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`))