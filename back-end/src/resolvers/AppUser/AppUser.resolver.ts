import { Args, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import AppUser from '../../models/AppUser/AppUser.entity';
import AppUserRepository from '../../models/AppUser/AppUser.repository';
import { SignInArgs, SignUpArgs } from './AppUser.input';
import {
  getSessionIdInCookie,
  removeCookie,
  setSessionIdInCookie,
} from '../../http-utils';
import { GlobalContext } from '../..';
import SessionRepository from '../../models/AppUser/Session.repository';
import Session from '../../models/AppUser/Session.entity';

@Resolver(AppUser)
export default class AppUserResolver {
  @Mutation(() => AppUser)
  signUp(
    @Args() { firstName, lastName, emailAddress, password }: SignUpArgs
  ): Promise<AppUser> {
    return AppUserRepository.createUser(
      firstName,
      lastName,
      emailAddress,
      password
    );
  }

  @Mutation(() => AppUser)
  async signIn(
    @Args() { emailAddress, password }: SignInArgs,
    @Ctx() context: GlobalContext
  ): Promise<AppUser> {
    const { user, session } = await AppUserRepository.signIn(
      emailAddress,
      password
    );
    setSessionIdInCookie(context, session.id);
    return user;
  }

  @Authorized()
  @Mutation(() => Session)
  logOut(@Ctx() context: GlobalContext): Promise<Session> {
    //remove cookie with http-utils method
    const sessionId = getSessionIdInCookie(context);
    if (!sessionId) {
      throw new Error('User has no cookie');
    }
    removeCookie(context, sessionId);
    //remove sessionId
    return SessionRepository.deleteSession(sessionId);
  }

  @Authorized()
  @Mutation(() => String)
  removeCookie(@Ctx() context: GlobalContext): string {
    //remove cookie with http-utils method
    const sessionId = getSessionIdInCookie(context);
    if (!sessionId) {
      throw new Error('User has no cookie');
    }
    removeCookie(context, sessionId);
    console.log('cookie', getSessionIdInCookie(context));

    return 'Le cookie a été supprimé avec succès.';
  }

  @Authorized()
  @Query(() => AppUser)
  async myProfile(@Ctx() context: GlobalContext): Promise<AppUser> {
    return context.user as AppUser;
  }
}
