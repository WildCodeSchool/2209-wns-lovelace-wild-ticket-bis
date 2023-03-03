import { Repository } from 'typeorm';
import Ticket from './Ticket.entity';

export default class TicketDb {
  protected static repository: Repository<Ticket>;
  protected static saveTicket(ticket: Ticket): Promise<Ticket> {
    return this.repository.save(ticket);
  }
}
