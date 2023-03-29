import {
  Args,
  Mutation,
  PubSub,
  PubSubEngine,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import Ticket, { NotificationPayload } from '../../models/Ticket/Ticket.entity';
import TicketRepository from '../../models/Ticket/Ticket.repository';
import { AddTicketArgs, SubTicketArgs } from './Ticket.input';

@Resolver(() => Ticket)
export default class TicketResolver {
  @Mutation(() => Ticket)
  async addTicket(
    { flowName, ticketNumber }: AddTicketArgs,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Ticket> {
    const ticket = TicketRepository.createTicket(flowName, ticketNumber);
    const payload: NotificationPayload = { id: 3333, message: ticket };
    await pubSub.publish('test', payload);
    return ticket;
  }

  @Subscription(() => Ticket, { topics: 'test' })
  subTicket({ id, payload }: SubTicketArgs): Ticket {
    return payload;
  }
}
