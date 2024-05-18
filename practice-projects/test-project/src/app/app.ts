/**
 * Title: Practice-Project
 * Description: A Practice Project for learning express with typescript
 * Author: Noyon Rahman
 * Date: 14-05-2024
 * Contributed by: Noyon Rahman (noyonalways)
 * Email: noyonrahman2003@gmail.com
 * GitHub: https://github.com/noyonalways
 */

import express, { NextFunction, Request, Response } from "express";
import appRoutes from "./routes";

const app = express();

// logger middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
};

app.use(logger);
app.use(appRoutes);

type TCustomError = {
  status?: number;
  message: string;
};

app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error: TCustomError = new Error("Route not found!");
  error.status = 404;
  next(error);
});

app.use(
  (err: TCustomError, _req: Request, res: Response, _next: NextFunction) => {
    console.log(err.message);

    const message = err.message || "Server Error Occurred";
    const status = err.status || 500;
    res.status(status).json({ message });
  }
);

export default app;
