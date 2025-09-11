import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 flex justify-between px-10 py-4 bg-white dark:bg-gray-900">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer text-xl font-semibold text-gray-800 dark:text-gray-100"
      >
        Medium
      </Link>

      <div className="flex items-center">
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-4 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            New
          </button>
        </Link>

        <button
          onClick={handleLogout}
          type="button"
          className="mr-4 text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5"
        >
          Logout
        </button>

        <Avatar size={48} name={currentUser.name || "Anonymous"} />
      </div>
    </div>
  );
};
