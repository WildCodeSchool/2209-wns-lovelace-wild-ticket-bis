import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Flow from '../Flow/Flow.entity';

enum Status {
  TICKET_NON_SCANNE = 'Ticket non scanné',
  EN_ATTENTE = 'En attente',
  INCIDENT = 'Incident',
  TICKET_VALIDE = 'Ticket validé',
}

@Entity()
@ObjectType()
export default class Ticket {
  constructor(flow: Flow) {
    if (flow) {
      this.flow = flow;
    }
  }
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('text', { default: Status.TICKET_NON_SCANNE })
  @Field()
  status: Status;

  @CreateDateColumn()
  @Field()
  date: Date;

  @Column('boolean', { default: false })
  @Field()
  isTrash: boolean;

  @ManyToOne(() => Flow, (flow) => flow.tickets, { onDelete: 'CASCADE' })
  @Field(() => Flow)
  flow: Flow;
}
