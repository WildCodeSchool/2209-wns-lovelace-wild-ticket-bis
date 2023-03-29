import { ArgsType, Field, ID } from 'type-graphql';
import { Status } from '../../models/Ticket/Ticket.entity';

@ArgsType()
export class changeTicketStatusArgs {
  @Field()
  id: string;

  @Field()
  status: Status;
}

@ArgsType()
export class changeTicketsStatusArgs {
  @Field(() => [ID])
  arrayId: string[];

  @Field()
  status: Status;
}
