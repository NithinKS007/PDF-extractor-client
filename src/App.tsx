import ProtectedUser from "./components/ProtectedUser";
import UserLayout from "./layouts/UserLayout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route element={<ProtectedUser />}>
          <Route element={<UserLayout />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;

