import * as Yup from "yup";

const signUpValidation = () => {
  return Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
};

const signInValidation = () => {
  return Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
};

const pdfValidation = () => {
  return Yup.object().shape({
    file: Yup.mixed()
      .required('PDF file is required')
      .test('fileFormat', 'Only PDF files are supported', (value) => {
        return value && (value as File).type === 'application/pdf';
      }),
  });
};
export { signInValidation, signUpValidation,pdfValidation };
