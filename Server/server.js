import app from './app.js';
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js';

connectDB();

app.listen(3000, () => {
  console.log('Server running on port 3000');
});