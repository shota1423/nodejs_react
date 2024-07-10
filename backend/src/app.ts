import express from "express";
import apiRoute from "./routes/apiRoute";
import dotenv from "dotenv";
import "./config/database";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", apiRoute);

const port = process.env.WEB_PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running`);
    console.log(`http://localhost:${port}`);
})