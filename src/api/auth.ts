import { axiosInstance } from "../config/axios";
import { SignInValues, SignUpValues } from "../types/authTypes";

/*  
    Purpose: Registers a new user by sending their registration data to the backend.
    Incoming: userData (email, password, name)
    Returns: The response data, including user details, upon successful registration.
    Throws: An error if the request fails or if the backend returns an error.
*/
const signUpUser = async (userData: SignUpValues) => {
  const response = await axiosInstance.post("auth/sign-up", userData);
  return response.data;
};

/*  
    Purpose: Authenticates an existing user by verifying their credentials (email and password).
    Incoming: userData (email, password)
    Returns: JWT token and user data on successful login.
    Throws: An error if the login request fails or the credentials are incorrect.
*/
const signInUser = async (userData: SignInValues) => {
  const response = await axiosInstance.post("auth/sign-in", userData);
  console.log(response);
  return response.data;
};


/*  
    Purpose: Signs out the currently authenticated user and invalidates the session.
    Returns: The response data indicating whether the sign-out was successful.
    Throws: An error if the sign-out request fails.
*/

const signOut = async () => {
  const response = await axiosInstance.post("auth/sign-out");
  return response.data;
};

export { signUpUser, signInUser, signOut };
