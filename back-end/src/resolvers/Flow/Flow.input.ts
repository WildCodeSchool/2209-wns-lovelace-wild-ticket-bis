import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class AddFlowArgs {
  @Field()
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field()
  @IsString()
  @MinLength(1, {
    message: 'Flux must be at least 1 character',
  })
  @MaxLength(20, { message: 'Flux must be a maximum on 20 character' })
  flowName: string;
}

@ArgsType()
export class getTicketsByFlowIdArgs {
  @Field()
  @IsNotEmpty()
  @IsString()
  flowId: string;
}
