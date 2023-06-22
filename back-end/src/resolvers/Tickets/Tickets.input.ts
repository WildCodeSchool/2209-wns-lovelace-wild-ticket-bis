import {
  ArrayMinSize,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ArgsType, Field, ID, ObjectType } from 'type-graphql';
import { Status } from '../../models/Ticket/Ticket.entity';

@ArgsType()
export class changeTicketStatusArgs {
  @Field()
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}

@ArgsType()
export class changeTicketsStatusArgs {
  @Field(() => [ID])
  @ArrayMinSize(1)
  @IsString({ each: true })
  arrayId: string[];

  @Field()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}

@ArgsType()
export class AddTicketArgs {
  @Field()
  @IsNotEmpty()
  @IsString()
  flowName: string;
}

@ArgsType()
export class SubTicketArgs {
  @Field()
  @IsNotEmpty()
  @IsString()
  id: string;
}

@ObjectType()
export class Notification {
  @Field()
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  message: string;
}

@ArgsType()
export class ChangeTicketsIsTrash {
  @Field(() => [ID])
  @ArrayMinSize(1)
  @IsString({ each: true })
  arrayId: string[];

  @Field()
  @IsNotEmpty()
  @IsBoolean()
  isTrash: boolean;
}

export interface NotificationPayload {
  id: string;
  message: string;
}

@ArgsType()
export class SubscriptionFilter {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  id?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsString({ each: true })
  ids?: string[];
}

@ArgsType()
export class TicketId {
  @Field()
  @IsNotEmpty()
  @IsString()
  id: string;
}
