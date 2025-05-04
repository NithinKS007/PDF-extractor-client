import { FormikProps } from "formik";
import { SignUpValues } from "../types/authTypes";

interface SignUpFormProps {
  formik: FormikProps<SignUpValues>;
  toggleAuthState: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ formik, toggleAuthState }) => {
  return (
    <div className="p-6 w-80 border border-gray-300 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-gray-800 text-white rounded-md hover:bg-gray-500"
        >
          {formik.isSubmitting ? <span>Loading...</span> : "Sign Up"}
        </button>
        <p className="mt-4 text-center">
          Already have an account?
          <button
            onClick={toggleAuthState}
            className="ml-1 text-blue-700 hover:underline"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
