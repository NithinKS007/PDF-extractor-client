import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { signInValidation, signUpValidation } from "../utils/validationSchema";
import { SignInValues, SignUpValues } from "../types/authTypes";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import { signInUser, signUpUser } from "../api/auth";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth";

const AuthPage: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const navigate = useNavigate();

  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const formikSignIn = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidation,
    onSubmit: async (values: SignInValues) => {
      console.log("Sign In values", values);
      try {
        const response = await signInUser(values);
        useAuthStore.getState().setAuthData(response.data.userData);
        useAuthStore.getState().setAccessToken(response.data.accessToken);
        showSuccessToast(response.message);
        formikSignIn.resetForm();
        setIsSignIn(false);
        navigate("/home");
      } catch (error: any) {
        console.log(`API Error sign-in${error}`);
        const errorMessage =
          error.response?.data?.message || "Login failed. Please try again.";
        showErrorToast(errorMessage);
      } finally {
        console.log("Login complete");
      }
    },
  });

  const formikSignUp = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signUpValidation,
    onSubmit: async (values: SignUpValues) => {
      console.log("Sign Up values", values);

      try {
        const response = await signUpUser(values);
        showSuccessToast(response.message);
        formikSignUp.resetForm();
        setIsSignIn(true);
      } catch (error: any) {
        console.log(`API Error sign-up ${error}`);
        const errorMessage =
          error.response?.data?.message ||
          "Registration failed. Please try again.";
        showErrorToast(errorMessage);
      } finally {
        console.log("Registration complete");
      }
    },
  });

  const toggleAuthState = (): void => {
    setIsSignIn(!isSignIn);
    formikSignIn.resetForm();
    formikSignUp.resetForm();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {isSignIn ? (
        <SignInForm formik={formikSignIn} toggleAuthState={toggleAuthState} />
      ) : (
        <SignUpForm formik={formikSignUp} toggleAuthState={toggleAuthState} />
      )}
    </div>
  );
};

export default AuthPage;
