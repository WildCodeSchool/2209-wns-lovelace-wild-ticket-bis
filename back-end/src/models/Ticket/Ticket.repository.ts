import { Repository } from 'typeorm';
import { getRepository } from '../../database/utils';
import FlowRepository from '../Flow/Flow.repository';
import Ticket from './Ticket.entity';
import TicketDb from './TicketDb';

export default class TicketRepository extends TicketDb {
  static repository: Repository<Ticket>;
  static async initializeRepository() {
    this.repository = await getRepository(Ticket);
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }

  static async initializeTicket() {
    const flow = await FlowRepository.getFlowByName('Le camion vert');
    if (flow) {
      const ticket1 = new Ticket(flow);
      this.repository.save(ticket1);
      const ticket2 = new Ticket(flow);
      this.repository.save(ticket2);
    }
  }

  static async getTicketById(id: string): Promise<Ticket | null> {
    return this.repository.findOneBy({ id });
  }

  static async createTicketByFlowId(flowId: string) {
    const flow = await FlowRepository.getFlowById(flowId);
    if (!flow) {
      throw Error('No existing Flow matching ID');
    } else {
      const ticket = new Ticket(flow);
      return this.saveTicket(ticket);
    }
  }

  static async deleteTicket(arrayId: string[]): Promise<number> {
    const result = await this.repository.delete(arrayId);
    if (!result.affected) {
      throw Error('No existing Ticket matching ID.');
    }
    return result.affected;
  }
}
