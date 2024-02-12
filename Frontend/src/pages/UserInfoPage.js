import { useNavigate } from "react-router-dom";

export const UserInfoPage = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="content-container bg-blue-950">
      <button
        className="text-xl cursor-pointer font-serif mt-10 text-gray-50 bg-gradient-to-r from-purple-600 to-pink-600  relative px-32 py-4 rounded-lg"
        onClick={logOut}
      >
        Log Out
      </button>
    </div>
  );
};
