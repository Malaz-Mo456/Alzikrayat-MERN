import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import photoRoutes from './routes/photoRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

import { notFound } from './middleware/errorHandler.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Alzikrayat API is running'
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/photos', commentRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();