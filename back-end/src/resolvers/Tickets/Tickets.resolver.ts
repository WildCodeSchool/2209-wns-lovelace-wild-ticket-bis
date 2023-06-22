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
  NotificationPayload,
  SubscriptionFilter,
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
  addTicketByFlowId(
    @Args() { flowId }: getTicketsByFlowIdArgs
  ): Promise<Ticket> {
    return TicketRepository.createTicketByFlowId(flowId);
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
    const payload: NotificationPayload = {
      id: ticket.id,
      message: ticket.status,
    };
    await pubSub.publish('STATUS_TICKET_CHANGE', payload);
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

  @Subscription(() => Notification, { topics: 'STATUS_TICKET_CHANGE' })
  normalSubscription(@Root() messagePayload: Notification): Notification {
    return messagePayload;
  }

  @Subscription(() => Notification, {
    topics: 'STATUS_TICKET_CHANGE',
    filter: ({
      payload,
      args,
    }: ResolverFilterData<Notification, { id: string; ids: string }>) => {
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
}
