import { Request, Response, Router, RouterOptions } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("The App is running successfully");
});

router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Healthy",
    status: 200,
    timestamp: new Date().toLocaleTimeString(),
  });
});

export default router;
