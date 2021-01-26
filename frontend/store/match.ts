import { StateChanger } from "vue-infinite-loading";
import { User, Demand, Supply, DasboardTeamsQuery, DasboardTeamsQueryVariables } from "@/apollo/schema";
import { ActionContext } from 'vuex';
import { IState } from ".";
import getTeams from "@/apollo/queries/dashboard/teams.gql";
import { ApolloClient } from 'apollo-client';

export type MatchFilter = {
  range: number
}

export interface IMatchState {
  loaded: Promise<void>;
  me?: Pick<User, "id" | "firstName" | "lastName"> | null,
  demands: Demand[],
  supplies: Supply[],

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
    (arg: 'match/teams', payload: Pick<IMatchState, 'me' | 'demands' | 'supplies'>): void;
  }

  export interface Dispatch {
    (arg: 'match/loadteams', payload: ApolloClient<any>): Promise<void>;
  }
}

let resolveLoaded: () => void;
const loadedState = new Promise((resolve) => resolveLoaded = resolve as () => void);

export const state = () => ({
  loaded: loadedState,
  spinnerid: 0,
  filter: {
    range: 30,
  },

  triggerLoadMore: 0,
  loadMore: null,

  demands: [],
  supplies: [],
} as IMatchState);

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

  teams(state: IMatchState, payload: Pick<IMatchState, 'me' | 'demands' | 'supplies'>) {
    // console.debug('updating teams', payload);

    state.me = payload.me;
    state.demands = payload.demands;
    state.supplies = payload.supplies;
  },
};

export const actions = {
  async loadteams({ commit }: ActionContext<IMatchState, IState>, client: ApolloClient<any>) {
    const result = await client.query<
      DasboardTeamsQuery,
      DasboardTeamsQueryVariables
    >({
      query: getTeams,
      fetchPolicy: "network-only"
    });

    commit('teams', {
      demands: result.data.activeDemands,
      supplies: result.data.activeSupplies,
      me: result.data.me,
    });

    resolveLoaded();
  }
}
