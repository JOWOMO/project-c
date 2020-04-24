
export interface ISupportState {
    context?: string
}

declare module "vuex" {
    export interface Commit {
        (arg: 'support/context', payload: string): void;
    }

    export interface Dispatch {
    }
  }

export const state = () => ({
} as ISupportState)

export const mutations = {
  context(state: ISupportState, payload: string) {
        state.context = payload
    },
}
