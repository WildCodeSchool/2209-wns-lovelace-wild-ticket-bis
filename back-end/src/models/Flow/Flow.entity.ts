import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import AppUser from '../AppUser/AppUser.entity'
import Ticket from '../ticket/Ticket.entity'

@Entity()
@ObjectType()
export default class Flow {
  constructor(flowName: string, appUser: AppUser) {
    this.flowName = flowName
    this.appUser = appUser
  }

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  flowName: string

  @Column('date', { nullable: false })
  @Field()
  date: Date

  @ManyToOne(() => AppUser, (appUser) => appUser.flows)
  appUser: AppUser

  @OneToMany(() => Ticket, (ticket) => ticket.flow)
  tickets: Ticket[]
}
