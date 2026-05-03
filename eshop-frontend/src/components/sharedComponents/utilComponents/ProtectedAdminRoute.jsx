
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../store/AuthContext";
 
export default function ProtectedAdminRoute({ children }) {
  const { isAdmin } = useContext(AuthContext);
 
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
 
  return children;
}
