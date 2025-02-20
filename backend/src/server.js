import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import router from './routers/college.router.js';
import userRouter from './routers/user.router.js';
import { dbconnect } from './config/database.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dbconnect(); // Ensure this function correctly connects to your database

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000', // Adjust based on your frontend's origin
}));

app.use('/api/colleges', router);
app.use('/api/users', userRouter);

const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));

// Serve index.html for any other route to support SPA (Single Page Application) routing
app.get('*', (req, res) => {
  const indexFilePath = path.join(publicFolder, 'index.html');
  res.sendFile(indexFilePath);
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
