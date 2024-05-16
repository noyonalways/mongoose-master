import { Router } from "express";
import studentController from "./student.controller";

const router: Router = Router();

router.post("/students", studentController.create);

export default router;
