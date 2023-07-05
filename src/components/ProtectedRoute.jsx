import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (!loading && user != null) {
    localStorage.setItem("uid", user.uid);
  }

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}

export default ProtectedRoute;
