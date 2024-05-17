import { Request, Response, Router } from "express";
import studentRoutes from "../modules/Student/student.route";
const router: Router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("OK");
});

// main routes
router.use("/api/v1", studentRoutes);

export default router;
