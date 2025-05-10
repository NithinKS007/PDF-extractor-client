import { Outlet, useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavBar";
import useAuthStore from "../store/auth/authStore";
import { signOut } from "../api/auth";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const UserLayout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await signOut();
      showSuccessToast(response.message);
      logout();
      navigate("/");
    } catch (error) {
      console.log("Error during sign-out:", error);
      showErrorToast("Something went wrong while signing out. Please try again.");
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed w-full top-0 left-0 z-50 bg-white shadow-md">
        <TopNavbar handleLogout={handleLogout} />
      </div>
      <div className="mt-[60px] p-4 flex-grow">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
