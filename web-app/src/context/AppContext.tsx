import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useQuery,
} from '@apollo/client';
import { MyprofileQuery } from 'gql/graphql';
import { createContext, useEffect, useState } from 'react';

const USER_PROFILE = gql`
  query MyProfileQuery {
    myProfile {
      id
      emailAddress
      firstName
      lastName
    }
  }
`;

type ValueType = {
  userProfile: MyprofileQuery | null;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<MyprofileQuery | null>>;
};

export const AppContext = createContext<ValueType | null>(null);

export function ContextProvider({ children }: any) {
  const { data, error, refetch } = useQuery<MyprofileQuery | null>(
    USER_PROFILE
  );
  const [userProfile, setUserProfile] = useState<MyprofileQuery | null>(null);

  useEffect(() => {
    if (data) {
      setUserProfile(data);
    }
  }, [data, error]);

  return (
    <AppContext.Provider value={{ userProfile, refetch }}>
      {children}
    </AppContext.Provider>
  );
}
