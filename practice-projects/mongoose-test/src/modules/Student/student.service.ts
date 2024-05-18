import { IStudent } from "./student.interface";
import Student from "./student.model";

const create = (data: IStudent) => {
  const result = new Student({ ...data });
  return result.save();
};

const getAll = () => {
  return Student.find({});
};

const findByProperty = (key: string, value: string) => {
  if (key === "_id") {
    return Student.findById(value);
  } else {
    return Student.findOne({ [key]: value });
  }
};

export default { create, getAll, findByProperty };
