import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

const passwordRegExp = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);

@ArgsType()
export class SignUpArgs {
  @Field()
  @MinLength(1, {
    message: 'Firstname must be at least one character long',
  })
  @MaxLength(20, {
    message: 'Firstname must be a maximum of 20 character long',
  })
  firstName: string;

  @Field()
  @MinLength(1, { message: 'Lastname must be at least one character long' })
  @MaxLength(20, {
    message: 'Lastname must be a maximum of 20 character long',
  })
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @Field()
  @IsString()
  @Matches(passwordRegExp, {
    message:
      'Password should have at least 1 number, lower, upper & special char and have at least 8 characters',
  })
  password: string;
}

@ArgsType()
export class SignInArgs {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;
}
