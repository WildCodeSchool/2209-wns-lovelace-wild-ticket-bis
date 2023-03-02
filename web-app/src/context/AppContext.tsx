import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useQuery,
} from '@apollo/client';
import { MyprofileQuery } from 'gql/graphql';
import { createContext, useEffect, useState } from 'react';

export const MY_PROFILE = gql`
  query Myprofile {
    myProfile {
      id
      firstName
      flows {
        flowName
        id
      }
    }
  }
`;

type ValueType = {
  userProfile: MyprofileQuery | null;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<MyprofileQuery | null>>;
  selectedFlow:
    | {
        value: string;
        label: string;
      }
    | undefined;
  setSelectedFlow: React.Dispatch<
    React.SetStateAction<
      | {
          value: string;
          label: string;
        }
      | undefined
    >
  >;
};

export const AppContext = createContext<ValueType | null>(null);

export function ContextProvider({ children }: any) {
  const { data, refetch } = useQuery<MyprofileQuery>(MY_PROFILE);
  const [userProfile, setUserProfile] = useState<MyprofileQuery | null>(null);

  const [selectedFlow, setSelectedFlow] = useState<{
    value: string;
    label: string;
  }>();

  useEffect(() => {
    if (data) {
      setUserProfile(data);
    }
  }, [data]);

  return (
    <AppContext.Provider
      value={{ userProfile, refetch, selectedFlow, setSelectedFlow }}
    >
      {children}
    </AppContext.Provider>
  );
}
