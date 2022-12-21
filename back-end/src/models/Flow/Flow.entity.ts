import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import AppUser from '../AppUser/AppUser.entity'
import Ticket from '../Ticket/Ticket.entity'

@Entity()
@ObjectType()
export default class Flow {
  constructor(flowName: string, tickets?: Ticket[]) {
    this.flowName = flowName
    if (tickets) {
      this.tickets = tickets
    }
  }

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  flowName: string

  @CreateDateColumn()
  date: Date

  @ManyToOne(() => AppUser, (appUser) => appUser.flows)
  @Field(() => AppUser)
  appUser: AppUser

  @OneToMany(() => Ticket, (ticket) => ticket.flow)
  @Field(() => [Ticket])
  tickets: Ticket[]
}
