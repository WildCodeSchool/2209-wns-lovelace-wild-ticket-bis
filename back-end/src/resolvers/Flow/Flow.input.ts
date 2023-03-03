import { MinLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import Flow from '../../models/Flow/Flow.entity';

@ArgsType()
export class AddFlowArgs {
  @Field()
  id: string;

  @Field()
  @MinLength(1, {
    message: 'Le nom doit faire au moins un caractère de long.',
  })
  flowName: string;
}

@ArgsType()
export class getFlowWithTicketsArgs {
  @Field()
  flowId: string;
}
