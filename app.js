import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import connectDatabase from './config/database.js';
import posRouter from "./routes/pos.routes.js";
import errorHandler from "./middleware/errors/error.handler.js";
import cors from 'cors'

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

connectDatabase();

app.use("/api/v1", posRouter);


app.use((req, res) => {
    res.status(404).json({ success: false, status: 404, message: "Not Found" });
});


app.use(errorHandler);

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`The server connection is now established and running on port ${port}`);
});
