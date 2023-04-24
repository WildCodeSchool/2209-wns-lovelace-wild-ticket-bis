import { ArgsType, Field, ID, InputType, ObjectType } from 'type-graphql';
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

@ArgsType()
export class SubscriptionFilter {
  @Field({ nullable: true })
  id?: string;
}

