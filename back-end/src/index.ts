import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { ExpressContext } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';

import AppUserResolver from './resolvers/AppUser/AppUser.resolver';
import AppUserRepository from './models/AppUser/AppUser.repository';
import SessionRepository from './models/AppUser/Session.repository';
import { getSessionIdInCookie } from './http-utils';
import AppUser from './models/AppUser/AppUser.entity';
import FlowRepository from './models/Flow/Flow.repository';
import TicketRepository from './models/Ticket/Ticket.repository';
import FlowResolver from './resolvers/Flow/Flow.resolver';

export type GlobalContext = ExpressContext & {
  user: AppUser | null;
};

const startServer = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AppUserResolver, FlowResolver],
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
  });

  // The `listen` method launches a web server.
  const { url } = await server.listen();

  await AppUserRepository.initializeRepository();
  await SessionRepository.initializeRepository();
  await FlowRepository.initializeRepository();
  await TicketRepository.initializeRepository();

  await AppUserRepository.initializeUser();
  await FlowRepository.initializeFlow();
  await TicketRepository.initializeTicket();

  console.log(`🚀  Server ready at ${url}`);
};

startServer();
