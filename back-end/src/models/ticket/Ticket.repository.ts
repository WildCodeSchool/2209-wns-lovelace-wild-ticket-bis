import { Repository } from 'typeorm'
import { getRepository } from '../../database/utils'
import FlowRepository from '../Flow/Flow.repository'
import Ticket from './Ticket.entity'

export default class TicketRepository {
  private static repository: Repository<Ticket>
  static async initializeRepository() {
    this.repository = await getRepository(Ticket)
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({})
  }

  static async initializeTicket() {
    this.clearRepository()
    const flow = await FlowRepository.getFlowByName('Le camion vert')
    if (flow) {
      const ticket1 = new Ticket(2052, flow)
      this.repository.save(ticket1)
      const ticket2 = new Ticket(2053, flow)
      this.repository.save(ticket2)
    }
  }
}
