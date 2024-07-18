/* eslint-disable react/prop-types */
import { createContext } from "react";
import authApi from "../apis/auth";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from "../utils/local-storage";
import { useState } from "react";
import { useEffect } from "react";
import usePage from "../hooks/usePage";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentBanner } = usePage();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (getAccessToken()) {
          const res = await authApi.getAuthUser();
          setAuthUser(res.data.user);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await authApi.login(credentials);
      setAccessToken(res.data.accessToken);
      const resGetAuthUser = await authApi.getAuthUser();
      setAuthUser(resGetAuthUser.data.user);
      setCurrentBanner(1);
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response?.data.message) toast.error(err.response.data.message);
        else toast.error("internal server error");
      }
    }
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        setAuthUser,
        isLoading,
        authUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
