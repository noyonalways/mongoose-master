import { z } from "zod";

// Define the Zod schema for IUserName
const userNameSchema = z.object({
  firstName: z
    .string({ message: "firstName is required" })
    .min(3, "firstName must be more than 3 characters")
    .max(20, "firstName can't be more than 20 characters"),
  middleName: z.string().optional(),
  lastName: z.string().max(20, "lastName can't be more than 20 characters"),
});

// Define the Zod schema for IGuardian
const guardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// Define the Zod schema for ILocalGuardian
const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Define the Zod schema for IStudent
const studentSchema = z.object({
  studentId: z.string(),
  name: userNameSchema,
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImage: z
    .string()
    .url({ message: "profileImage must be a valid image url" })
    .optional(),
  isActive: z.enum(["active", "inactive"]).default("active").optional(),
  isDeleted: z.boolean().default(false).optional(),
});

export default studentSchema;
