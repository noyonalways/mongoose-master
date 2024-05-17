import { Router } from "express";
import studentController from "./student.controller";

const router: Router = Router();

router
  .route("/students")
  .post(studentController.create)
  .get(studentController.getAll);

export default router;
