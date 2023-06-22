import 'reflect-metadata';
import { ExpressContext, ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginDrainHttpServer,
} from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import AppUserResolver from './resolvers/AppUser/AppUser.resolver';
import AppUserRepository from './models/AppUser/AppUser.repository';
import { getSessionIdInCookie } from './http-utils';
import AppUser from './models/AppUser/AppUser.entity';
import FlowRepository from './models/Flow/Flow.repository';
import TicketRepository from './models/Ticket/Ticket.repository';
import FlowResolver from './resolvers/Flow/Flow.resolver';
import { initializeDatabaseRepositories } from './database/utils';
import TicketResolver from './resolvers/Tickets/Tickets.resolver';
import { IS_PRODUCTION } from './config';
import { PubSub } from 'graphql-subscriptions';

export type GlobalContext = ExpressContext & {
  user: AppUser | null;
};
const PORT = 4000;

//initialize pubsub with redis
export const pubSub = new PubSub();
const startServer = async () => {
  /**
   * Create express server
   */
  const express = require('express');
  const app = express();
  const httpServer = createServer(app);

  // Create our WebSocket server using the express server we just set up.
  const wsServer = new WebSocketServer({
    server: httpServer,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: '/api',
  });

  const schema = await buildSchema({
    resolvers: [AppUserResolver, FlowResolver, TicketResolver],
    pubSub,
    authChecker: async ({ context }) => {
      return Boolean(context.user);
    },
  });
  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);

  //Create a Apollo Server
  const serverApollo = new ApolloServer({
    schema: schema,
    context: async (context): Promise<GlobalContext> => {
      const sessionId = getSessionIdInCookie(context);
      const user = !sessionId
        ? null
        : await AppUserRepository.findBySessionId(sessionId);

      return { res: context.res, req: context.req, user };
    },
    csrfPrevention: true,
    cache: 'bounded',

    /**
     * What's up with this embed: true option?
     * These are our recommended settings for using AS;
     * they aren't the defaults in AS3 for backwards-compatibility reasons but
     * will be the defaults in AS4. For production environments, use
     * ApolloServerPluginLandingPageProductionDefault instead.
     **/

    //Add a plugins when apollo server down , the server express down with him
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await serverApollo.start();
  serverApollo.applyMiddleware({ app, path: '/api' });

  // The `listen` method launches a web server.

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server is ready at http://localhost:${PORT}${serverApollo.graphqlPath}`
    );
  });

  await initializeDatabaseRepositories();

  if (!IS_PRODUCTION) {
    await AppUserRepository.initializeUser();
    await FlowRepository.initializeFlow();
    await TicketRepository.initializeTicket();
  }
};

startServer();
