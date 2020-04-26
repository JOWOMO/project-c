
export type User = {
  email?: string,
  password?: string,
  lastName?: string,
  firstName?: string,
}

export interface IRegistrationState {
  user: User
  // track: string;
  position: number;
}

declare module "vuex" {
  export interface Commit {
    (arg: 'register/user', payload: User): void;
    // (arg: 'register/track', payload: string): void;
    (arg: 'register/position', payload: number): void;
  }

  export interface Dispatch {
  }
}

export const state = () => ({
  user: {},
  // track: '',
  position: 0,
} as IRegistrationState)

export const mutations = {
  user(state: IRegistrationState, payload: User) {
    state.user = payload
  },

  // track(state: IRegistrationState, payload: string) {
  //   state.track = payload
  // },

  position(state: IRegistrationState, payload: number) {
    // console.debug('position', payload);
    state.position = payload;
  },
}
