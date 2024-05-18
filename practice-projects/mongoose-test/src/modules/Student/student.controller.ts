import { NextFunction, Request, Response } from "express";
import studentService from "./student.service";
import { IStudent } from "./student.interface";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentService.create(req.body);
    res.status(201).json({
      status: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result: IStudent[] = await studentService.getAll();
    res.status(201).json({
      status: true,
      message: "Student data retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingle = async (req: Request, res: Response, next: NextFunction) => {
  const { studentId } = req.params;
  try {
    const result: IStudent | null = await studentService.findByProperty(
      "_id",
      studentId,
    );
    res.status(201).json({
      status: true,
      message: "Student data retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default { create, getAll, getSingle };