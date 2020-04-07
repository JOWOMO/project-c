
export type User = {
    email?: string,
    password?: string,
    lastName?: string,
    firstName?: string,
}

export interface IRegistrationState {
    user: User
}

declare module "vuex" {
    export interface Commit {
        (arg: 'register/user', payload: User): void;
    }
  
    export interface Dispatch {
    }
  }

export const state = () => ({
    user: {
    },
} as IRegistrationState)

export const mutations = {
    user(state: IRegistrationState, payload: User) {
        state.user = payload
    },
}
