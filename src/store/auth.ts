import { create } from "zustand";
interface User {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
  setAuthData: (user: User) => void;
  setAccessToken: (accessToken: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => {
  const savedAccessToken = localStorage.getItem("accessToken");
  const savedUser = localStorage.getItem("user");
  const savedIsAuthenticated = savedAccessToken && savedUser ? true : false;

  return {
    accessToken: savedAccessToken || null,
    user: savedUser ? JSON.parse(savedUser) : null,
    isAuthenticated: savedIsAuthenticated,

    setAuthData: (user) => {
      set({
        user,
        isAuthenticated: true,
      });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true");
    },
    setAccessToken: (accessToken) => {
      set({
        accessToken,
        isAuthenticated: true,
      });
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("isAuthenticated", "true");
    },
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
