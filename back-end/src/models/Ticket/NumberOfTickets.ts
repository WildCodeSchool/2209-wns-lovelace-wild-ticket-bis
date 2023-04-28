import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class NumberOfTickets {
  @Field({ defaultValue: 0 })
  nonScanned: number;

  @Field({ defaultValue: 0 })
  waiting: number;

  @Field({ defaultValue: 0 })
  incident: number;

  @Field({ defaultValue: 0 })
  validate: number;
}
