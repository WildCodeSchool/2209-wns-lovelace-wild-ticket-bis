import AppUser from '../AppUser/AppUser.entity';
import AppUserRepository from '../AppUser/AppUser.repository';
import FlowDb from './Flow.db';
import Flow from './Flow.entity';

export default class FlowRepository extends FlowDb {
  static async initializeFlow(): Promise<void> {
    const user = await AppUserRepository.findOneByEmail(
      'harrypotter@email.com'
    );
    if (user) {
      await this.createFlow('Le camion vert', user.id);
      await this.createFlow("Pas d'idée de nom", user.id);
      await this.createFlow('Le van a Harry Potter', user.id);
    }
  }
  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }

  static async createFlow(flowName: string, id: string): Promise<Flow> {
    const appUser = await AppUserRepository.findOneById(id);
    if (appUser) {
      const flow = new Flow(flowName, appUser);
      return this.saveFlow(flow);
    } else {
      throw new Error('Aucun utilisateur');
    }
  }

  static async getFlowByName(flowName: string): Promise<Flow | null> {
    return this.repository.findOneBy({ flowName });
  }
  static async getFlowById(id: string): Promise<Flow | null> {
    if (id) {
      //return flow with tickets order by descending date
      const flow = await this.repository.findOneBy({ id });
      (await flow?.tickets)?.sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      );
      return flow;
    } else {
      throw new Error(`Aucun Flu n'a été trouvé`);
    }
  }

  static async deleteFlow(arrayId: string[]): Promise<number> {
    const result = await this.repository.delete(arrayId);
    if (!result.affected) {
      throw new Error('No matching flows with id');
    }
    return result.affected;
  }
}
