import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import exampleRoutes from './routes/example.route.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin: process.env.ORIGIN_URL}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/examples', exampleRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});

export default app;