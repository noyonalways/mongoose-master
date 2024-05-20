import { customError } from "../../utils";
import { IStudent } from "./student.interface";
import Student from "./student.model";

const create = async (data: IStudent): Promise<IStudent> => {
  const student = new Student({ ...data });

  // mongoose custom instance method
  if (await student.isUserExists(data.email))
    throw customError(400, "Email already exists");

  return student.save(); // built-in instance method
};

const getAll = (): Promise<IStudent[]> => {
  return Student.find({}).select("-password");
};

const findByProperty = (
  key: string,
  value: string,
): Promise<IStudent | null> => {
  if (key === "_id") {
    return Student.findById(value);
  } else {
    return Student.findOne({ [key]: value });
  }
};

const deleteSingle = (studentId: string) => {
  return Student.updateOne({ studentId }, { isDeleted: true });
};

export default { create, getAll, findByProperty, deleteSingle };
