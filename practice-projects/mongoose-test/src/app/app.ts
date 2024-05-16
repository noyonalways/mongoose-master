import express from "express";
import cors from "cors";
import router from "./routes";
import "colors";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use(router);

export default app;
