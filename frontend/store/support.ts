
export interface ISupportState {
  available: boolean,
  show: boolean,

  isError: boolean,
  context?: string
}

declare module "vuex" {
  export interface Commit {
    (arg: 'support/context', payload: string | { text: string, isError: boolean }): void;
    (arg: 'support/available', payload: boolean): void;
    (arg: 'support/show'): void;
    (arg: 'support/close'): void;
  }

  export interface Dispatch {
  }
}

export const state = () => ({
  available: false,
  show: false,
} as ISupportState)

export const mutations = {
  show(state: ISupportState) {
    state.show = true;
  },

  available(state: ISupportState, payload: boolean) {
    state.available = payload;
  },

  close(state: ISupportState) {
    state.show = false;
  },

  context(state: ISupportState, payload: string | { text: string, isError: boolean }) {
    console.debug('context >', payload);

    state.context = typeof payload === 'string' ? payload : (payload as any).text;
    state.isError = (payload as any).isError || false;
  },
}
