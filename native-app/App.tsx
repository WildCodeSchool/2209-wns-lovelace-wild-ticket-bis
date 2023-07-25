import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './components/Navigation';
import cookie from 'cookie';
import { BACKGROUND_COLOR } from './styles/style-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from '@apollo/client/link/context';
import { ContextProvider } from './context/AppContext';
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';

const authMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const cookies = context.response.headers.get('Set-Cookie');
    if (cookies) {
      const sessionId = cookie.parse(cookies);
      const setCookie = cookie.serialize('sessionId', sessionId.sessionId);
      AsyncStorage.setItem('Cookie', setCookie);
    }
    return response;
  });
});

const authLink = setContext(async (_, { headers }) => {
  const sessionId = await AsyncStorage.getItem('Cookie');
  return {
    headers: {
      ...headers,
      Cookie: sessionId,
    },
  };
});

const httpLink = createHttpLink({
  uri: `http://192.168.1.13:5000/api`,
});

const client = new ApolloClient({
  link: authLink.concat(authMiddleware).concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    // Ajoutez d'autres polices si nécessaire
  });
  if (!fontsLoaded) {
    return null; // Vous pouvez afficher un écran de chargement ici si nécessaire
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <ContextProvider>
            <Navigation />
          </ContextProvider>
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
}
