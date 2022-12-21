import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export default class Ticket {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  status: string

  @Column()
  @Field()
  order_number: number

  @Column()
  @Field()
  date: Date

  @Column()
  @Field()
  isTrash: boolean
}
