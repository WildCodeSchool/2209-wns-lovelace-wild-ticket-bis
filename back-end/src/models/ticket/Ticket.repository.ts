import { Repository } from 'typeorm'
import { getRepository } from '../../database/utils'
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
    await this.repository.save({})
  }
}
