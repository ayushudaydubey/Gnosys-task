import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import candidateRoutes from './routes/candidate.routes.js';
import screeningRoutes from './routes/screening.routes.js';
import roundRoutes from './routes/round.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));


app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


app.use("/api/candidates", candidateRoutes);
app.use("/api/screening", screeningRoutes);
app.use("/api/rounds", roundRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default app;