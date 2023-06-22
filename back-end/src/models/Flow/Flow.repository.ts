import AppUser from '../AppUser/AppUser.entity';
import AppUserRepository from '../AppUser/AppUser.repository';
import { Status } from '../Ticket/Ticket.entity';
import FlowDb from './Flow.db';
import Flow from './Flow.entity';

export type NumberOfTickets = {
  nonScanned: number;
  waiting: number;
  incident: number;
  validate: number;
};

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
      throw new Error('No user found');
    }
  }

  static async getFlowByName(flowName: string): Promise<Flow | null> {
    return this.repository.findOneBy({ flowName });
  }
  static async getFlowById(id: string): Promise<Flow | null> {
    //return flow with tickets order by descending date
    const flow = await this.repository.findOneBy({ id });
    if (!flow) {
      throw new Error('No existing Flow matching flowname');
    }
    (await flow?.tickets)?.sort((a, b) => a.date.getTime() - b.date.getTime());
    return flow;
  }

  static async getTicketCountByStatus(
    flowId: string
  ): Promise<NumberOfTickets> {
    const flow = await this.getFlowById(flowId);

    if (!flow) {
      throw Error('No existing flow matching id');
    }

    const ticketCount = {
      nonScanned: 0,
      waiting: 0,
      incident: 0,
      validate: 0,
    };

    const tickets = await flow.tickets;
    for (const ticket of tickets) {
      switch (ticket.status) {
        case Status.TICKET_NON_SCANNE:
          ticketCount.nonScanned++;
          break;
        case Status.EN_ATTENTE:
          ticketCount.waiting++;
          break;
        case Status.INCIDENT:
          ticketCount.incident++;
          break;
        case Status.TICKET_VALIDE:
          ticketCount.validate++;
          break;
        default:
          break;
      }
    }
    return ticketCount;
  }

  static async deleteFlow(arrayId: string[]): Promise<number> {
    const result = await this.repository.delete(arrayId);
    if (!result.affected) {
      throw new Error('No exisiting flows matching ids');
    }
    return result.affected;
  }
}
