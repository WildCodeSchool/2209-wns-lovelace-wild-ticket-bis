import { SIGN_IN_PATH } from 'pages/paths';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ user, children }: any) => {
  if (!user) {
    return <Navigate to={SIGN_IN_PATH} replace />;
  }
  return children;
};

export default ProtectedRoutes;
