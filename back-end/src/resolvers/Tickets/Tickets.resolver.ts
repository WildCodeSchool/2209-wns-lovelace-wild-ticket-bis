import {
  Arg,
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
} from 'type-graphql';
import Ticket, { GetTicketsByIdType } from '../../models/Ticket/Ticket.entity';
import TicketRepository from '../../models/Ticket/Ticket.repository';
import { getTicketsByFlowIdArgs } from '../Flow/Flow.input';
import {
  changeTicketsStatusArgs,
  changeTicketStatusArgs,
  Notification,
  NotificationPayload,
  SubscriptionFilter,
  TicketId,
} from './Tickets.input';
import { pubSub } from '../..';

export default class TicketResolver {
  @Query(() => Ticket)
  getTicketById(@Args() { id }: TicketId): Promise<Ticket | null> {
    return TicketRepository.getTicketById(id);
  }

  @Mutation(() => Ticket)
  addTicketByFlowId(
    @Args() { flowId }: getTicketsByFlowIdArgs
  ): Promise<Ticket> {
    return TicketRepository.createTicketByFlowId(flowId);
  }

  @Mutation(() => Int)
  deleteTickets(
    @Arg('arrayId', () => [String]) arrayId: string[]
  ): Promise<number> {
    return TicketRepository.deleteTicket(arrayId);
  }

  @Mutation(() => Ticket)
  async changeTicketStatus(
    @Args() { id, status }: changeTicketStatusArgs
  ): Promise<Ticket | null> {
    const ticket = await TicketRepository.updateTicketStatus(id, status);
    const payload: NotificationPayload = {
      id: ticket.id,
      message: ticket.status,
    };
    await pubSub.publish('STATUS_TICKET_CHANGE', payload);
    return ticket;
  }

  @Mutation(() => [Ticket])
  changeTicketsStatus(
    @Args() { arrayId, status }: changeTicketsStatusArgs
  ): Promise<Ticket[] | null> {
    return TicketRepository.updateTicketsStatus(arrayId, status);
  }

  @Subscription(() => Notification, { topics: 'STATUS_TICKET_CHANGE' })
  normalSubscription(@Root() messagePayload: Notification): Notification {
    return messagePayload;
  }

  @Subscription(() => Notification, {
    topics: 'STATUS_TICKET_CHANGE',
    filter: ({
      payload,
      args,
    }: ResolverFilterData<Notification, { id: string }>) => {
      const { id } = args;
      return !id || payload.id === id;
    },
  })
  subscriptionWithId(
    @Root() payload: Notification,
    @Args() id: SubscriptionFilter
  ): Notification {
    return payload;
  }
}
