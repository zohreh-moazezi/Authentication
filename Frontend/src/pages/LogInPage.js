import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../hooks/useToken";

export const LogInPage = () => {
  const [token, setToken] = useToken();
  const [users, setUsers] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const onLogInClicked = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email: emailValue,
        password: passwordValue,
      });
      const { token } = response.data;
      setToken(token);
      setUsersFromResponse(response.data);
    } catch (error) {
      console.log("error during signup", error);
    }
  };
  const setUsersFromResponse = (UserData) => {
    setUsers(UserData);
    navigate("/");
  };

  return (
    <div class=" bg-sky-950 flex flex-col justify-center relative h-screen">
      <div class=" mx-auto">
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div class="relative ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6"></div>
          <div className="content-container relative flex flex-col justify-center items-center  bg-sky-950 w-96">
            <h1 className="text-4xl font-extrabold mt-12  text-gray-50 font-serif">
              Log In
            </h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <form className="flex flex-col">
              <div className="mt-14 mb-3">
                <label className=" text-xl font-bold  text-gray-50 font-serif">
                  Email
                </label>
                <input
                  className="form-input outline-none focus:outline-none focus:border-slate-50 !important cursor-text bg-gradient-to-r from-purple-600 to-pink-600 ml-12 rounded-2xl placeholder:text-slate-50 font-serif text-slate-50"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="someone@gmail.com"
                />
              </div>
              <div className="mt-8 mb-3">
                <label className=" text-xl font-bold text-gray-50 font-serif">
                  Password
                </label>
                <input
                  className=" text-slate-50 outline-none focus:outline-none focus:border-slate-50 !important cursor-text font-serif form-input mx-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600  placeholder:text-slate-50"
                  type="password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  placeholder="password"
                />
              </div>

              <button
                className="disabled:text-gray-600 cursor-pointer text-xl font-serif mt-10 text-gray-50 bg-gradient-to-r from-purple-600 to-pink-600  relative px-32 py-4 hover: bg-sky-950 rounded-lg  "
                disabled={!emailValue || !passwordValue}
                onClick={onLogInClicked}
              >
                Log In
              </button>

              <button
                onClick={handleSignUpClick}
                className="text-gray-50 mt-5 mb-6 font-serif"
              >
                Don't have an account? Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
