import { IStudent } from "./student.interface";
import Student from "./student.model";

const create = (data: IStudent) => {
  const result = new Student({ ...data });
  return result.save();
};

const getAll = () => {
  return Student.find({});
};

export default { create, getAll };
