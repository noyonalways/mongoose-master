import { IStudent } from "./student.interface";
import Student from "./student.model";

const create = (data: IStudent): Promise<IStudent> => {
  const result = new Student({ ...data });
  return result.save();
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
