import { IsUUID, MinLength } from 'class-validator';
import { ArgsType, Field, InputType } from 'type-graphql';
import AppUser from '../../models/AppUser/AppUser.entity';

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
