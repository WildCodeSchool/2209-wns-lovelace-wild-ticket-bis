import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { IS_PRODUCTION, WS_DEV } from 'config';
import { ContextProvider } from 'context/AppContext';
import { createClient } from 'graphql-ws';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App/App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const httpLink = new HttpLink({
  uri: '/api',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: IS_PRODUCTION ? `${process.env.REACT_APP_WS_PROD}` : WS_DEV,
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
wsLink.client.on('connecting', () => {
  console.log('connecting');
});

console.log(httpLink.options.uri);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
console.log(client);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
