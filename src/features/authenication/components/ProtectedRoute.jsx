import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";

export default function ProtectedRoute({ children }) {
  const { authUser, isLoading } = useAuth();
  if (!authUser && !isLoading) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {isLoading && <Loading />}
      {children}
    </>
  );
}
