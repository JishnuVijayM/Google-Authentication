require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db');
const app = express();

const authRoutes = require('./routes/authRoute');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes)

const PORT = process.env.PORT || 5999;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })

