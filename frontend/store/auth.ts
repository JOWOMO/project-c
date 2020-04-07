import Auth, { CognitoUser } from '@aws-amplify/auth';
import { ActionContext, Store } from 'vuex';
import { IState } from '.';
import { IRegistrationState } from './register';
import { User } from './register';

Auth.configure({
  identityPoolId: process.env.identityPoolId,
  region: process.env.region,
  userPoolId: process.env.userPoolId,
  userPoolWebClientId: process.env.userPoolWebClientId,

  storage: localStorage,
});

export interface IAuthState {
  isAuthenticated: boolean,
  user?: CognitoUser,
}

declare module "vuex" {
  export interface Commit {
  }

  export interface Dispatch {
    (arg: 'auth/load'): Promise<CognitoUser>;
    (arg: 'auth/register', payload: Required<Pick<User, 'email' | 'password' | 'firstName' | 'lastName'>>): Promise<CognitoUser>;
    (arg: 'auth/token'): Promise<string>;
    (arg: 'auth/confirm', payload: Required<Pick<User, 'email'>> & { code: string }): Promise<void>;
    (arg: 'auth/startResetPassword', payload: Required<Pick<User, 'email'>>): Promise<void>;
    (arg: 'auth/resetPassword', payload: Required<Pick<User, 'email' | 'password'>> & { code: string }): Promise<void>;
    (arg: 'auth/resentCode'): Promise<void>;
    (arg: 'auth/login', payload: Required<Pick<User, 'email' | 'password'>>): Promise<void>;
    (arg: 'auth/logout'): Promise<void>;
  }
}

export const state = () => ({
  isAuthenticated: false,
} as IAuthState);

export const mutations = {
  set(state: IAuthState, user: CognitoUser) {
    console.info('setting user state to', user);

    state.isAuthenticated = !!user
    state.user = user
  }
}

export const getters = {
}

export const actions = {
  async load({ commit, rootState }: ActionContext<IAuthState, IState>) {
    if (rootState.auth.user) {
      return;
    }

    try {
      const user = await Auth.currentAuthenticatedUser();
      commit('set', user);

      return user;
    } catch (e) {
      commit('set', null)
    }
  },

  // we preserve the login information to be able to
  // continue the registration without additional details
  async register(
    { commit }: ActionContext<IAuthState, IState>,
    { email, password, firstName, lastName }: Required<Pick<User, 'email' | 'password' | 'firstName' | 'lastName'>>
  ) {
    const user = await Auth.signUp({
      username: email,
      password,

      attributes: {
        email,
        given_name: firstName,
        family_name: lastName,
      },
    });

    console.log('auth', 'register', user);
    commit('set', user.user);
    return user.user;
  },

  async token() {
    const currentSession = await Auth.currentSession();
    return currentSession.getAccessToken().getJwtToken();
  },

  async confirm(
    { }: ActionContext<IAuthState, IState>,
    { email, code }: Required<Pick<User, 'email'>> & { code: string },
  ) {
    console.log("code:", code);

    try {
      await Auth.confirmSignUp(email, code);
    } catch (e) {
      if (e.code !== 'NotAuthorizedException' || e.message != 'User cannot be confirmed. Current status is CONFIRMED') {
        console.error(e);
        throw e;
      }
    }
  },

  async startResetPassword(
    { }: ActionContext<IAuthState, IState>,
    { email }: Required<Pick<User, 'email'>>
  ) {
    console.log("reset:", email);
    return await Auth.forgotPassword(email);
  },

  async resetPassword(
    { }: ActionContext<IAuthState, IState>,
    { email, code, password }: Required<Pick<User, 'email' | 'password'>> & { code: string }
  ) {
    await Auth.forgotPasswordSubmit(email, code, password);
  },

  async resendcode({ commit }: ActionContext<IAuthState, IState>, { email }: Required<Pick<User, 'email'>>) {
    await Auth.resendSignUp(email);
  },

  async login(
    { commit }: ActionContext<IAuthState, IState>,
    { email, password }: Required<Pick<User, 'email' | 'password'>>
  ) {
    // there is a mismatch in naming
    const user = await Auth.signIn(
      email,
      password,
    );

    // safety check
    await Auth.currentSession();

    commit('set', user);
    return user;
  },

  async logout(
    { commit }: ActionContext<IAuthState, IState>
  ) {
    await Auth.signOut();
    commit('set', null);
  },
}
