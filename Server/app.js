import express from 'express';
import cors from 'cors';

const app = express();
import  candidateRoutes from './routes/candidate.routes.js'
import screeningRoutes  from  './routes/screening.routes.js'
import roundRoutes from './routes/round.routes.js'
import dashboardRoutes from  './routes/dashboard.routes.js'
 
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use("/api/candidates", candidateRoutes);
app.use("/api/screening", screeningRoutes);
app.use("/api/rounds", roundRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

export default app;