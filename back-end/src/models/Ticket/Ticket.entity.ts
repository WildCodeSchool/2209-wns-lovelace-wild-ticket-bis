import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Flow from '../Flow/Flow.entity'

enum Status {
  TICKET_NON_SCANNE = 'Ticket non scanné',
  EN_ATTENTE = 'En attente',
  INCIDENT = 'Incident',
  TICKET_VALIDE = 'Ticket validé',
}

@Entity()
@ObjectType()
export default class Ticket {
  constructor(orderNumber: number, flow: Flow) {
    this.orderNumber = orderNumber
    if (flow) {
      this.flow = flow
    }
  }
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column('text', { default: Status.TICKET_NON_SCANNE })
  @Field()
  status: Status

  @Column()
  @Field()
  orderNumber: number

  @CreateDateColumn()
  date: Date

  @Column('boolean', { default: false })
  @Field()
  isTrash: boolean

  @ManyToOne(() => Flow, (flow) => flow.tickets)
  @Field(() => Flow)
  flow: Flow
}
