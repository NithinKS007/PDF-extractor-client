import { Outlet, useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavBar";
import useAuthStore from "../store/auth";

const UserLayout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar handleLogout={handleLogout} />
      <div className="flex flex-1">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
