import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../config/db";
import templateRoutes from "../routes/template.route";
import testRoutes from "../routes/test.route";
import cors from "cors";
import { secretKeyMiddleware } from "../middleware/secret-key.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors({origin: process.env.ORIGIN_URL})); // Only allow requests from this origin

app.use(express.json()); // To accept json data in req.body

app.get("/", (req, res) => {
    res.send('API is Running! 🎉')
});

app.use("/api/tests", testRoutes);
app.use("/api/templates", secretKeyMiddleware, templateRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})

module.exports = app;