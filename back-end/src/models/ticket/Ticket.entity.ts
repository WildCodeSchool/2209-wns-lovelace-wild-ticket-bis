import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
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
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column('text')
  @Field()
  status: Status

  @Column()
  @Field()
  order_number: number

  @Column()
  @Field()
  date: Date

  @Column('boolean', { default: false })
  @Field()
  isTrash: boolean

  @ManyToOne(() => Flow, (flow) => flow.tickets)
  flow: Flow
}
