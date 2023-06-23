import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './components/Nagigation';
import { WS_DEV } from './config';
import { BACKGROUND_COLOR } from './styles/style-constants';
import Tickets from './screens/Tickets/Tickets';

const httpLink = new HttpLink({
  uri: '/api',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: WS_DEV,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <Navigation />
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${BACKGROUND_COLOR}`,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
