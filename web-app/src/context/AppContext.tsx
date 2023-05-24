import {
  ApolloQueryResult,
  OperationVariables,
  useQuery,
} from '@apollo/client';
import { MY_PROFILE } from 'gql-store';
import { MyprofileQuery } from 'gql/graphql';
import { createContext, useEffect, useState } from 'react';

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

type Props = {
  children: JSX.Element;
};

export const AppContext = createContext<ValueType | null>(null);

export function ContextProvider({ children }: Props) {
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
