import {
  Arg,
  Args,
  Int,
  Mutation,
  PubSubEngine,
  Root,
  Subscription,
} from 'type-graphql';
import Ticket from '../../models/Ticket/Ticket.entity';
import TicketRepository from '../../models/Ticket/Ticket.repository';
import { getTicketsByFlowIdArgs } from '../Flow/Flow.input';
import {
  changeTicketsStatusArgs,
  changeTicketStatusArgs,
  Notification,
  NotificationPayload,
} from './Tickets.input';
import { pubSub } from '../..';

export default class TicketResolver {
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
    await pubSub.publish('test', payload);
    return ticket;
  }

  @Mutation(() => [Ticket])
  changeTicketsStatus(
    @Args() { arrayId, status }: changeTicketsStatusArgs
  ): Promise<Ticket[] | null> {
    return TicketRepository.updateTicketsStatus(arrayId, status);
  }

  @Subscription(() => Notification, { topics: 'test' })
  normalSubscription(@Root() messagePayload: Notification): Notification {
    console.log(messagePayload, 'ciicicicicicicicici');
    return messagePayload;
  }
}
