import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Router from './routes/index.route.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: process.env.VITE_APP_URL,
    credentials: true,
}));
app.use(express.json());

app.use("/api", Router);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected ✅");
        app.listen(PORT, () => console.log(`Server at http://localhost:${process.env.PORT}`));
    })
    .catch((err) => console.error("MongoDB error: ", err));