import { DataSource, EntityTarget } from 'typeorm';
import { DATABASE_URL, NODE_ENV, TEST_DATABASE_URL } from '../config';
import AppUserRepository from '../models/AppUser/AppUser.repository';
import SessionRepository from '../models/AppUser/Session.repository';
import FlowRepository from '../models/Flow/Flow.repository';
import TicketRepository from '../models/Ticket/Ticket.repository';

const dataSource = new DataSource({
  type: 'postgres',
  url: NODE_ENV === 'test' ? TEST_DATABASE_URL : DATABASE_URL,
  entities: [__dirname + `/../models/**/*.entity.{js,ts}`],
  logging: NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  migrationsRun: true,
});

let initialized = false;
async function getDatabase() {
  if (!initialized) {
    await dataSource.initialize();
    initialized = true;
    console.log('Successfully connected to database.');
  }
  return dataSource;
}

async function getRepository(entity: EntityTarget<any>) {
  return (await getDatabase()).getRepository(entity);
}

async function initializeDatabaseRepositories() {
  await AppUserRepository.initializeRepository();
  await FlowRepository.initializeRepository();
  await TicketRepository.initializeRepository();
  await SessionRepository.initializeRepository();
}

async function closeConnection() {
  await dataSource.destroy();
}

export default dataSource;
export {
  getDatabase,
  getRepository,
  initializeDatabaseRepositories,
  closeConnection,
};
