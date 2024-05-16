import { NextFunction, Request, Response } from "express";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const data = req.body;
  } catch (error) {
    next(error);
  }
};

export default { create };
