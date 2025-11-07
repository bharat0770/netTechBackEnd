// server.js
const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const connectDB = require('./config/dbConnect');
const userRoutes = require('./routes/users/api');
// require('dotenv').config();
const linkRoutes = require('./routes/links/api');

const app = express();

// 🔧 Middleware
app.use(cors({
  origin: [
  "https://net-tech-front-end.vercel.app",
  "http://localhost:5173"
],
  credentials: true, // if you're sending cookies or auth headers
}));
app.use(express.json());

// 🧩 Routes
app.use('/api/users', userRoutes);
app.use("/api/links", linkRoutes); 

// 🚀 Connect to MongoDB
connectDB(config.mongodb_uri).then(() => {
  console.log('✅ Database connected');
  // 🖥 Start the server
    app.listen(config.port, () => {
    console.log(`✅ Server running on port ${config.port}`);
    });

}).catch((err) => {
  console.error('❌ Database connection failed:', err);
});

