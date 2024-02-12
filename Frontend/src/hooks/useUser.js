import { useState, useEffect } from "react";
import { useToken } from "./useToken";
import { jwtDecode } from "jwt-decode";

export const useUser = () => {
  const [token] = useToken();
  console.log("token is", token);
  const decodeToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
      return decodedToken;
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;
    return decodeToken(token);
  });

  useEffect(() => {
    if (!token) {
      console.log("Token is null. User set to null.");
      setUser(null);
    } else {
      try {
        console.log("Setting new token");
        const decodedToken = decodeToken(token);
        console.log("Decoded Token:", decodedToken);
        setUser(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
      }
    }
  }, [token]);

  return user;
};
