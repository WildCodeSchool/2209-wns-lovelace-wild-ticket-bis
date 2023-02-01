import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ user, children }: any) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoutes;
