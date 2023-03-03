import { Field, ID, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import AppUser from '../AppUser/AppUser.entity';
import Ticket from '../Ticket/Ticket.entity';

@Entity()
@ObjectType()
export default class Flow {
  constructor(flowName: string, appUser: AppUser, tickets?: Ticket[]) {
    this.flowName = flowName;
    this.appUser = appUser;
    if (tickets) {
      this.tickets = Promise.resolve(tickets);
    }
  }

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  flowName: string;

  @CreateDateColumn()
  @Field()
  date: Date;

  @ManyToOne(() => AppUser, (appUser) => appUser.flows)
  @Field(() => AppUser)
  appUser: AppUser;

  @OneToMany(() => Ticket, (ticket) => ticket.flow, { cascade: true })
  @Field(() => [Ticket])
  tickets: Promise<Ticket[]>;
}
