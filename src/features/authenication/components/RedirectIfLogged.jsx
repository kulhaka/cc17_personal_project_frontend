/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";

export default function RedirectIfLogged({ children }) {
  const { authUser, isLoading } = useAuth();

  if (authUser && !isLoading) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isLoading && <Loading />}
      {children}
    </>
  );
}
