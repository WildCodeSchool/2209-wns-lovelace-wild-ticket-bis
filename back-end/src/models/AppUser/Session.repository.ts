import AppUser from "./AppUser.entity";
import SessionDb from "./Session.db";
import Session from "./Session.entity";

export default class SessionRepository extends SessionDb {
  static createSession(user: AppUser): Promise<Session> {
    const session = new Session(user);
    return this.saveSession(session);
  }

  static async deleteSession(session: Session): Promise<Session> {
    const existingSession = await this.findById(session.id);
    if (!existingSession) {
      throw new Error("No existing session for this User");
    }
    await this.repository.remove(existingSession);
    // resetting ID because existingSession loses ID after calling remove
    existingSession.id = session.id;
    return existingSession;
  }

  static findById(id: string): Promise<Session | null> {
    return this.repository.findOneBy({ id });
  }
}

