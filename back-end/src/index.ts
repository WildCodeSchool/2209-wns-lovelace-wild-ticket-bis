import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { ExpressContext } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';

import AppUserResolver from './resolvers/AppUser/AppUser.resolver';
import AppUserRepository from './models/AppUser/AppUser.repository';
import { getSessionIdInCookie } from './http-utils';
import AppUser from './models/AppUser/AppUser.entity';
import FlowRepository from './models/Flow/Flow.repository';
import TicketRepository from './models/Ticket/Ticket.repository';
import FlowResolver from './resolvers/Flow/Flow.resolver';

import { initializeDatabaseRepositories } from './database/utils';
import TicketResolver from './resolvers/Ticket/Ticket.resolver';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

export type GlobalContext = ExpressContext & {
  user: AppUser | null;
};

const startServer = async () => {
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'ws://localhost:4000/subscriptions',
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
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AppUserResolver, FlowResolver, TicketResolver],
      authChecker: async ({ context }) => {
        return Boolean(context.user);
      },
    }),

    context: async (context): Promise<GlobalContext> => {
      const sessionId = getSessionIdInCookie(context);
      const user = !sessionId
        ? null
        : await AppUserRepository.findBySessionId(sessionId);

      return { res: context.res, req: context.req, user };
    },
    csrfPrevention: false,
    cors: false,
    cache: 'bounded',
    
    
    
    /**
     * What's up with this embed: true option?
     * These are our recommended settings for using AS;
     * they aren't the defaults in AS3 for backwards-compatibility reasons but
     * will be the defaults in AS4. For production environments, use
     * ApolloServerPluginLandingPageProductionDefault instead.
     **/
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  } );

  // The `listen` method launches a web server.
  const { url } = await server.listen();

  await initializeDatabaseRepositories();

  await AppUserRepository.initializeUser();
  await FlowRepository.initializeFlow();
  await TicketRepository.initializeTicket();

  console.log(`🚀  Server ready at ${url}`);
};

startServer();
