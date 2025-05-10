import * as Yup from "yup";
import { SignInValues, SignUpValues } from "../types/authTypes";

/*  
  Purpose: Validation schema for user sign-up.
  Ensures that the user provides a valid name, email, and password.
  Returns: Yup validation schema for the sign-up form.
*/
const signUpValidation = (): Yup.ObjectSchema<SignUpValues> => {
  return Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
};

/*  
  Purpose: Validation schema for user sign-in.
  Ensures that the user provides a valid email and password.
  Returns: Yup validation schema for the sign-in form.
*/
const signInValidation = (): Yup.ObjectSchema<SignInValues> => {
  return Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
};

/*  
  Purpose: Validation schema for PDF file upload.
  Ensures the file input is a required PDF file and checks the file format.
  Returns: Yup validation schema for the file field.
*/
const pdfValidation = () => {
  return Yup.object().shape({
    file: Yup.mixed()
      .required("PDF file is required")
      .test("fileFormat", "Only PDF files are supported", (value) => {
        return value && (value as File).type === "application/pdf";
      }),
    fileName: Yup.string().required("File name is required"), 
  });
};
export { signInValidation, signUpValidation, pdfValidation };
