import {
  closeConnection,
  getDatabase,
  initializeDatabaseRepositories,
} from '../../../database/utils';
import AppUserRepository, {
  INVALID_CREDENTIALS_ERROR_MESSAGE,
} from '../../../models/AppUser/AppUser.repository';
import SessionRepository from '../../../models/AppUser/Session.repository';

describe('AppUserRepository integration', () => {
  beforeAll(async () => {
    await initializeDatabaseRepositories();
  });

  afterAll(async () => {
    await closeConnection();
  });

  beforeEach(async () => {
    const database = await getDatabase();
    for (const entity of database.entityMetadatas) {
      const repository = database.getRepository(entity.name);
      await repository.query(
        `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`
      );
    }
  });

  describe('SignIn', () => {
    describe('When email address does not belong to existing user', () => {
      it('Throws invalid credentials error', async () => {
        const emailAddress = 'unknown@user.com';
        expect(() =>
          AppUserRepository.signIn(emailAddress, 'whatever')
        ).rejects.toThrowError(INVALID_CREDENTIALS_ERROR_MESSAGE);
      });
    });
    describe('When email address belongs to existing user', () => {
      const emailAddress = 'jean@user.com';

      describe('When password invalid', () => {
        it('Throws invalid credentials error', async () => {
          await AppUserRepository.createUser(
            'Jean',
            'User',
            emailAddress,
            'mot-de-passe-de-jean'
          );

          expect(() =>
            AppUserRepository.signIn(emailAddress, 'mot-de-passe-incorrect')
          ).rejects.toThrowError(INVALID_CREDENTIALS_ERROR_MESSAGE);
        });
      });
      describe('When password valid', () => {
        it('Creates session in database', async () => {
          await AppUserRepository.createUser(
            'Jean',
            'User',
            emailAddress,
            'mot-de-passe-de-jean'
          );

          await AppUserRepository.signIn(emailAddress, 'mot-de-passe-de-jean');

          const sessions = await SessionRepository.repository.find();
          expect(sessions).toHaveLength(1);
          expect(sessions[0].user.emailAddress).toEqual(emailAddress);
        });

        it('Returns user and session', async () => {
          await AppUserRepository.createUser(
            'Jean',
            'User',
            emailAddress,
            'mot-de-passe-de-jean'
          );
          const result = await AppUserRepository.signIn(
            emailAddress,
            'mot-de-passe-de-jean'
          );
          expect(result).toHaveProperty('user');
          expect(result).toHaveProperty('session');
          expect(result.user.emailAddress).toEqual(emailAddress);
        });
      });
    });
  });
});
