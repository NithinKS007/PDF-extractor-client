import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/auth/authStore";

const ProtectedUser = () => {
  const { isAuthenticated } = useAuthStore();

  return !isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedUser;
