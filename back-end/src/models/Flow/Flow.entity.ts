import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import AppUser from '../AppUser/AppUser.entity'

@Entity()
@ObjectType()
export default class Flow {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  queue_name: string

  @Column()
  @Field()
  date: Date

  @ManyToOne(() => AppUser, (appUser) => appUser.flows)
  appUser: AppUser
}
