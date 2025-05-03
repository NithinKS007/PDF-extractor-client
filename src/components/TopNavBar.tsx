import { Link } from "react-router-dom";
interface TopNavBarProps {
  handleLogout: () => void;
}

const TopNavbar: React.FC<TopNavBarProps> = ({ handleLogout }) => {
  return (
    <header className= "bg-gray-800 p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">
          <Link to="/home">PDF EXTRACTOR</Link>
        </div>
        <button
          onClick={handleLogout}
          className="hover:text-gray-400 cursor-pointer"
        >
          LOGOUT
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
