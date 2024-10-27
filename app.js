import 'dotenv/config'
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db.js';

const app = express();

connectDB();

app.use(express.json());
app.use(helmet());
app.use(cors());



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`))