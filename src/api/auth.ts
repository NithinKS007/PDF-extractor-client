import { axiosInstance } from "../config/axios";
import { SignInValues, SignUpValues } from "../types/authTypes";

/**
 * Signs up a new user by sending their data to the backend.
 * 
 * @param userData - User registration data (e.g., `{ email, password, name }`).
 * 
 * @returns user data on success (HTTP 200).
 * 
 * @throws {AxiosError} Throws an error if the request fails or returns an error.
 */

const signUpUser = async (userData: SignUpValues) => {
  const response = await axiosInstance.post("auth/sign-up", userData);
  return response.data
};

/**
 * Signs in an existing user by validating their credentials.
 * 
 * @param userData - User credentials (e.g., `{ email, password }`).
 * 
 * @returns JWT token and user data on success (HTTP 200).
 * 
 * @throws {AxiosError} Throws an error if the request fails or returns an error.
 */

const signInUser = async (userData: SignInValues) => {
  const response = await axiosInstance.post("auth/sign-in", userData);
  console.log(response)
  return response.data
};

/**
 * Signs out the currently authenticated user.
 * 
 * Clears the server-side session and requires client-side token removal (e.g., from localStorage).
 * 
 * @returns The response from the backend indicating whether the sign-out was successful.
 * 
 * @throws {AxiosError} Throws an error if the sign-out fails.
 */

const signOut = async () => {
  const response = await axiosInstance.post("auth/sign-out");
  return response.data
};

export { signUpUser, signInUser, signOut };
