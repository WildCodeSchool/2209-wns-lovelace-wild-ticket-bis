import AppUserDb from './AppUser.db';
import AppUser from './AppUser.entity';

import { hashSync, compareSync } from 'bcryptjs';
import SessionRepository from './Session.repository';
import Session from './Session.entity';
import FlowRepository from '../Flow/Flow.repository';
import TicketRepository from '../Ticket/Ticket.repository';

export const INVALID_CREDENTIALS_ERROR_MESSAGE = 'Identifiants incorrects.';

export default class AppUserRepository extends AppUserDb {
  static async initializeUser(): Promise<void> {
    await TicketRepository.clearRepository();
    await FlowRepository.clearRepository();
    await SessionRepository.clearRepository();
    await this.clearRepository();
    await this.createUser(
      'Harry',
      'Potter',
      'harrypotter@email.com',
      'Harrypotter1!'
    );
  }

  static createUser(
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string
  ): Promise<AppUser> {
    const user = new AppUser(
      firstName,
      lastName,
      emailAddress,
      hashSync(password)
    );
    return this.saveUser(user);
  }

  static async signIn(
    emailAddress: string,
    password: string
  ): Promise<{ user: AppUser; session: Session }> {
    const user = await this.findByEmailAddress(emailAddress);

    if (!user || !compareSync(password, user.hashedPassword)) {
      throw new Error(INVALID_CREDENTIALS_ERROR_MESSAGE);
    }
    const session = await SessionRepository.createSession(user);
    return { user, session };
  }

  static async findBySessionId(sessionId: string): Promise<AppUser | null> {
    const session = await SessionRepository.findById(sessionId);
    if (!session) {
      return null;
    }
    return session.user;
  }

  static async findOneByEmail(email: string): Promise<AppUser | null> {
    return this.repository.findOneBy({ emailAddress: email });
  }

  static async findOneById(id: string): Promise<AppUser | null> {
    return this.repository.findOneBy({ id: id });
  }
}
