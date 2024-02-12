import { Navigate, Outlet } from "react-router-dom";

const WellCome = () => {
  return (
    <div className="bg-blue-950 flex flex-col justify-center items-center h-screen">
      <h1 className="font-serif text-7xl font-black  text-slate-50  ">
        WellCome
      </h1>
      <Outlet />
    </div>
  );
};

const ProtectedLayout = () => {
  const token = localStorage.getItem("token");
  return token ? <WellCome /> : <Navigate to="/signUp" />;
};

export default ProtectedLayout;
