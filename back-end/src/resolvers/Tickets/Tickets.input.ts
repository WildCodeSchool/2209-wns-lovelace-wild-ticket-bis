import { ArgsType, Field } from 'type-graphql';
import { Status } from '../../models/Ticket/Ticket.entity';

@ArgsType()
export class changeTicketStatusArgs {
  @Field()
  id: string;

  @Field()
  status: Status;
}
