import { randomBytes } from 'crypto';
import { Field, ID, ObjectType } from 'type-graphql';
import { BeforeInsert, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import AppUser from './AppUser.entity';

@Entity()
@ObjectType()
export default class Session {
  constructor(user: AppUser) {
    this.user = user;
  }

  @PrimaryColumn('varchar', {
    length: 32,
  })
  @Field(() => ID)
  id: string;

  @ManyToOne(() => AppUser, { eager: true })
  user: AppUser;

  @BeforeInsert()
  setId() {
    this.id = randomBytes(16).toString('hex');
  }
}
