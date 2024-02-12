import { useState } from "react";

export const useToken = () => {
  const storedToken = localStorage.getItem("token");
  const [token, setTokenInternal] = useState(storedToken);

  console.log("Token in useToken:", token);

  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setTokenInternal(newToken);
  };

  return [token, setToken];
};
