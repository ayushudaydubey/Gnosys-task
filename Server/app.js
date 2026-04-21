import express from 'express';
import cors from 'cors';

const app = express();
import  candidateRoutes from './routes/candidate.routes.js'
import screeningRoutes  from  './routes/screening.routes.js'
import roundRoutes from './routes/round.routes.js'
import dashboardRoutes from  './routes/dashboard.routes.js'
import path from 'path'
import { fileURLToPath } from 'url'
 
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, '../public')))

app.use("/api/candidates", candidateRoutes);
app.use("/api/screening", screeningRoutes);
app.use("/api/rounds", roundRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("*name",(req,res)=>{
  res.sendFile(path.join(__dirname,"../public/index.html"))
})


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

export default app;