import { Repository } from 'typeorm';
import { getRepository } from '../../database/utils';
import FlowRepository from '../Flow/Flow.repository';
import Ticket, { Status } from './Ticket.entity';
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

  static async updateTicketStatus(id: string, status: Status): Promise<Ticket> {
    const ticket = await this.getTicketById(id);
    if (!ticket) {
      throw Error('No existing Ticket matching ID.');
    }
    ticket.status = status;
    return await this.repository.save(ticket);
  }

  static async updateTicketsStatus(
    arrayId: string[],
    status: Status
  ): Promise<Ticket[]> {
    const tickets = await this.repository
      .createQueryBuilder('ticket')
      .whereInIds(arrayId)
      .getMany();

    if (!tickets) {
      throw Error('No existing Tickets matching IDs.');
    }

    tickets.forEach((ticket) => {
      ticket.status = status;
    });

    return this.repository.save(tickets);
  }

  static async updateTicketsIsTrash(
    arrayId: string[],
    isTrash: boolean
  ): Promise<Ticket[]> {
    const tickets = await this.repository
      .createQueryBuilder('ticket')
      .whereInIds(arrayId)
      .getMany();
    if (!tickets) {
      throw Error('No existing Tickets matching IDs.');
    }
    tickets.forEach((ticket) => {
      ticket.isTrash = isTrash;
    });

    return this.repository.save(tickets);
  }
}
