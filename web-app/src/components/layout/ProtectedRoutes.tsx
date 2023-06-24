import { MyprofileQuery } from 'gql/graphql';
import { SIGN_IN_PATH } from 'pages/paths';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  user: MyprofileQuery | null | undefined;
  children: ReactElement<any, any>;
};

const ProtectedRoutes = ({ user, children }: Props) => {
  // if (!user) {
  //   return <Navigate to={SIGN_IN_PATH} replace />;
  // }
  return children;
};

export default ProtectedRoutes;
