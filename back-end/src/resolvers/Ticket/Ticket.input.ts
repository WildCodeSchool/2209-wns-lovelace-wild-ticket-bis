import { ArgsType, Field } from 'type-graphql';
import Ticket from '../../models/Ticket/Ticket.entity';

@ArgsType()
export class AddTicketArgs {
  @Field()
  flowName: string;

  @Field()
  ticketNumber: number;
}

@ArgsType()
export class SubTicketArgs {
  @Field()
  id: number;

  @Field()
  payload: Ticket;
}

  