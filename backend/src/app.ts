import express from 'express';
import cors from 'cors';
import urlRoutes from './routes/urls';

require('dotenv').config();

const app = express();

// Use CORS middleware
app.use(cors()); // This allows all origins by default

// Routes
app.use(urlRoutes);

export default app;