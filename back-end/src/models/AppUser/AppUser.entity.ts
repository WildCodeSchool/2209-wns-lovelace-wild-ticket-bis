import { IsEmail } from 'class-validator'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from 'typeorm'
import Flow from '../Flow/Flow.entity'

@Entity()
@ObjectType()
export default class AppUser {
  constructor(
    firstName: string,
    lastName: string,
    emailAddress: string,
    hashedPassword: string,
    flows?: Flow[],
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.emailAddress = emailAddress
    this.hashedPassword = hashedPassword

    if (flows) {
      this.flows = Promise.resolve(flows)
    }
  }

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  @Index({ unique: true })
  @IsEmail()
  emailAddress: string

  @Column()
  @Field()
  firstName: string

  @Column()
  @Field()
  lastName: string

  @Column()
  hashedPassword: string

  @OneToMany(() => Flow, (flow) => flow.appUser)
  @Field(() => [Flow], { nullable: false })
  flows: Promise<Flow[]>
}
