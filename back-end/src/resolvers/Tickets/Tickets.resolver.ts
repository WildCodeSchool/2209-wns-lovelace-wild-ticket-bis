import { Arg, Args, Int, Mutation } from 'type-graphql';
import Ticket from '../../models/Ticket/Ticket.entity';
import TicketRepository from '../../models/Ticket/Ticket.repository';
import { getTicketsByFlowIdArgs } from '../Flow/Flow.input';
import {
  changeTicketsStatusArgs,
  changeTicketStatusArgs,
} from './Tickets.input';

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
  changeTicketStatus(
    @Args() { id, status }: changeTicketStatusArgs
  ): Promise<Ticket | null> {
    return TicketRepository.updateTicketStatus(id, status);
  }

  @Mutation(() => [Ticket])
  changeTicketsStatus(
    @Args() { arrayId, status }: changeTicketsStatusArgs
  ): Promise<Ticket[] | null> {
    return TicketRepository.updateTicketsStatus(arrayId, status);
  }
}
