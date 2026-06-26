const dotenv = require("dotenv");
//load env variables
dotenv.config();

//imports
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes =require("./routes/enrollmentRoutes");
const lessonRoutes = require("./routes/lessonRoutes");

const uploadRoutes =require("./routes/uploadRoutes");

//connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use( "/api/enrollments",enrollmentRoutes);
app.use("/api/lessons",lessonRoutes);
app.use("/api/upload",uploadRoutes);

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