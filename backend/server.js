//imports
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

//load env variables
dotenv.config();

//connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

//Home route
app.get("/",(req,res)=>{
    res.json({
        message: "Learn with Naina backend"
    });
});

//Sets port
const PORT = process.env.PORT || 5000;

//start seerver
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});