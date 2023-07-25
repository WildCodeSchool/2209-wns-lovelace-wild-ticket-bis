import {
  ApolloQueryResult,
  OperationVariables,
  useQuery,
} from '@apollo/client';
import { MY_PROFILE } from '../gql-store';
import { MyprofileQuery } from '../gql/graphql';
import { createContext, useEffect, useState } from 'react';

type ValueType = {
  userProfile: MyprofileQuery | null;
  serverError: boolean;
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
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  isConnected: boolean;
};

type Props = {
  children: JSX.Element;
};

export const AppContext = createContext<ValueType | null>(null);

export function ContextProvider({ children }: Props) {
  const { data, refetch, error } = useQuery<MyprofileQuery>(MY_PROFILE);

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<MyprofileQuery | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [selectedFlow, setSelectedFlow] = useState<{
    value: string;
    label: string;
  }>();

  let serverError: boolean;
  if (error) {
    serverError = true;
  } else {
    serverError = false;
  }

  useEffect(() => {
    if (isConnected) {
      if (data) {
        setUserProfile(data);
      }
    } else {
      setUserProfile(null);
    }
  }, [data, isConnected]);
  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        setIsConnected,
        isConnected,
        userProfile,
        serverError,
        refetch,
        selectedFlow,
        setSelectedFlow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
