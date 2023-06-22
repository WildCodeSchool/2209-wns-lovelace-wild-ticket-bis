import {
  Arg,
  Args,
  Authorized,
  Int,
  Mutation,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
} from 'type-graphql';
import { pubSub } from '../..';
import Ticket from '../../models/Ticket/Ticket.entity';
import TicketRepository from '../../models/Ticket/Ticket.repository';
import { getTicketsByFlowIdArgs } from '../Flow/Flow.input';
import {
  ChangeTicketsIsTrash,
  Notification,
  NotificationNewTicket,
  NotificationPayload,
  NotificationPayloadNewTicket,
  SubscriptionFilter,
  SubscriptionFilterFlowId,
  TicketId,
  changeTicketStatusArgs,
  changeTicketsStatusArgs,
} from './Tickets.input';

@Resolver(() => Ticket)
export default class TicketResolver {
  @Query(() => Ticket)
  getTicketById(@Args() { id }: TicketId): Promise<Ticket | null> {
    return TicketRepository.getTicketById(id);
  }

  @Authorized()
  @Mutation(() => Ticket)
  async addTicketByFlowId(
    @Args() { flowId }: getTicketsByFlowIdArgs
  ): Promise<Ticket> {
    const ticket = await TicketRepository.createTicketByFlowId(flowId);
    const payload: NotificationPayloadNewTicket = {
      id: ticket.id,
      message: ticket.status,
      flowId: flowId,
    };
    await pubSub.publish('NEW_TICKET_IN_FLOW', payload);
    return ticket;
  }

  @Authorized()
  @Mutation(() => Int)
  deleteTickets(
    @Arg('arrayId', () => [String]) arrayId: string[]
  ): Promise<number> {
    return TicketRepository.deleteTicket(arrayId);
  }

  @Authorized()
  @Mutation(() => Ticket)
  async changeTicketStatus(
    @Args() { id, status }: changeTicketStatusArgs
  ): Promise<Ticket | null> {
    const ticket = await TicketRepository.updateTicketStatus(id, status);
    return ticket;
  }

  @Authorized()
  @Mutation(() => [Ticket])
  async changeTicketsStatus(
    @Args() { arrayId, status }: changeTicketsStatusArgs
  ): Promise<Ticket[] | null> {
    const ticketsArray = await TicketRepository.updateTicketsStatus(
      arrayId,
      status
    );
    ticketsArray.forEach(async (element) => {
      let payload: NotificationPayload = {
        id: element.id,
        message: element.status,
      };
      await pubSub.publish('STATUS_TICKET_CHANGE', payload);
    });
    return ticketsArray;
  }

  @Authorized()
  @Mutation(() => [Ticket])
  changeTicketIsTrash(
    @Args() { arrayId, isTrash }: ChangeTicketsIsTrash
  ): Promise<Ticket[]> {
    return TicketRepository.updateTicketsIsTrash(arrayId, isTrash);
  }

  @Subscription(() => Notification, {
    topics: 'STATUS_TICKET_CHANGE',
    filter: ({
      payload,
      args,
    }: ResolverFilterData<Notification, { id: string; ids: string }>) => {
      console.log(args);
      const { id, ids } = args;
      return !id || payload.id === id || !ids || ids.includes(payload.id);
    },
  })
  subscriptionWithId(
    @Root() payload: Notification,
    @Args() subscriptionIds: SubscriptionFilter
  ): Notification {
    return payload;
  }

  @Subscription(() => NotificationNewTicket, {
    topics: 'NEW_TICKET_IN_FLOW',
    filter: ({
      payload,
      args,
    }: ResolverFilterData<NotificationNewTicket, { id: string }>) => {
      const { id } = args;
      return id === payload.flowId;
    },
  })
  SubscriptionForTicketAddToFlow(
    @Root() messagePayload: NotificationNewTicket,
    @Args() flowIdFilters: SubscriptionFilterFlowId
  ): NotificationNewTicket {
    return messagePayload;
  }

  @Subscription(() => Notification, { topics: 'STATUS_TICKET_CHANGE' })
  normalSubscription(@Root() messagePayload: Notification): Notification {
    return messagePayload;
  }
}
