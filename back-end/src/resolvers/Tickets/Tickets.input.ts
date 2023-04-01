import { ArgsType, Field, ID, ObjectType } from 'type-graphql';
import Ticket, { Status } from '../../models/Ticket/Ticket.entity';

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

@ArgsType()
export class AddTicketArgs {
  @Field()
  flowName: string;
}

@ArgsType()
export class SubTicketArgs {
  @Field()
  id: string;
}

@ObjectType()
export class Notification {
  @Field()
  id: string;

  @Field()
  message: string;
}

export interface NotificationPayload {
  id: string;
  message: string;
}
