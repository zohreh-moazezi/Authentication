import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../hooks/useToken";

export const SignUpPage = () => {
  const [token, setToken] = useToken();

  const [users, setUsers] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/login");
  };

  const onSignUpClicked = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("token");
      console.log("authtoken:", authToken);

      // const response = await new Promise((resolve) =>
      //   resolve({
      //     data: { token: "MyToken" },
      //   })
      // );
      const response = await axios.post("http://localhost:8080/api/signup", {
        email: emailValue,
        password: passwordValue,
      });

      const { token } = response.data;
      console.log("Token set in local storage:", token);

      setToken(token);
      setUsersFromResponse(response.data);
    } catch (error) {
      console.log("error during signup", error);
    }
  };

  const setUsersFromResponse = (userData) => {
    setUsers(userData);

    navigate("/");
  };

  return (
    <div class=" bg-sky-950 flex flex-col justify-center relative h-screen">
      <div class=" mx-auto">
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div class="relative px-7 py-6 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
            <div className="relative content-container flex flex-col justify-center items-center  bg-sky-950 w-96">
              {token ? (
                <>
                  <h1>Already logged in</h1>
                  <p>you are already logged in. Redirecting...</p>
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-extrabold mt-12  text-gray-50 font-serif ">
                    Sign Up
                  </h1>

                  {errorMessage && <div className="fail">{errorMessage}</div>}
                  <form className="flex flex-col">
                    <div className="mt-14 mb-3">
                      <label className=" text-xl font-bold  text-gray-50 font-serif">
                        Email
                      </label>
                      <input
                        className="form-input outline-none focus:outline-none focus:border-slate-50 !important  cursor-text bg-gradient-to-r from-purple-600 to-pink-600 ml-12 rounded-2xl placeholder:text-slate-50 font-serif text-slate-50"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        placeholder="someone@gmail.com"
                        type="email"
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
                    <div className="mt-8 mb-3">
                      <label className="font-serif text-xl font-bold  text-gray-50 ">
                        Confirm
                      </label>
                      <input
                        className="font-serif  text-slate-50 cursor-text form-input ml-6 rounded-2xl mb-10 outline-none focus:outline-none focus:border-slate-50 !important bg-gradient-to-r from-purple-600 to-pink-600  placeholder:text-slate-50"
                        type="password"
                        value={confirmPasswordValue}
                        onChange={(e) =>
                          setConfirmPasswordValue(e.target.value)
                        }
                        placeholder="confirm password"
                      />
                    </div>
                    <hr />

                    <button
                      className="disabled:text-gray-600 text-xl cursor-pointer font-serif mt-10 text-gray-50 bg-gradient-to-r from-purple-600 to-pink-600  relative px-32 py-4 rounded-lg  "
                      type="submit"
                      disabled={
                        !emailValue ||
                        !passwordValue ||
                        passwordValue !== confirmPasswordValue
                      }
                      onSubmit={onSignUpClicked}
                      onClick={onSignUpClicked}
                    >
                      Sign Up
                    </button>

                    <button
                      onClick={handleButtonClick}
                      className="text-gray-50 mt-5 mb-6 font-serif"
                    >
                      Already have an account? Log In
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
