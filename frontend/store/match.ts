import { StateChanger } from "vue-infinite-loading";

export type MatchFilter = {
  range: number
}

export interface IMatchState {
  filter: MatchFilter,
  spinnerid: number,

  triggerLoadMore: number,
  loadMore: StateChanger | null,
}

declare module "vuex" {
  export interface Commit {
    (arg: 'match/more', payload: number): void;
    (arg: 'match/range', payload: StateChanger): void;
    (arg: 'match/newspinner'): void;
  }

  export interface Dispatch {
  }
}

export const state = () => ({
  spinnerid: 0,
  filter: {
    range: 30,
  },

  triggerLoadMore: 0,
  loadMore: null,
} as IMatchState)

export const mutations = {
  range(state: IMatchState, payload: number) {
    state.filter.range = payload
  },

  more(state: IMatchState, payload: StateChanger) {
    state.triggerLoadMore = state.triggerLoadMore + 1;
    state.loadMore = payload
  },

  newspinner(state: IMatchState) {
    state.spinnerid = state.spinnerid += 1;
  },
}
