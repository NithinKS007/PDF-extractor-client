import { create } from "zustand";
import { AuthState } from "./authTypes";

/**
 * Zustand store for handling authentication state.
 * This store is responsible for keeping track of the user's authentication status,
 * access token, and user data, while also providing methods to set these values
 * and log the user out.
 */

const useAuthStore = create<AuthState>((set) => {
  const savedAccessToken = localStorage.getItem("accessToken");
  const savedUser = localStorage.getItem("user");
  const savedIsAuthenticated = savedAccessToken && savedUser ? true : false;

  return {
    accessToken: savedAccessToken || null,
    user: savedUser ? JSON.parse(savedUser) : null,
    isAuthenticated: savedIsAuthenticated,

    /**
     * Set user data and authentication state.
     * Stores user data and authentication status in localStorage.
     */
    setAuthData: (user) => {
      set({
        user,
        isAuthenticated: true,
      });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true");
    },

    /**
     * Set access token and authentication status.
     * Stores the access token in localStorage.
     */
    setAccessToken: (accessToken) => {
      set({
        accessToken,
        isAuthenticated: true,
      });
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("isAuthenticated", "true");
    },

    /**
     * Clears authentication data and logs out the user.
     * Removes user and token data from localStorage.
     */
    logout: () => {
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    },
  };
});

export default useAuthStore;
