<template>
  <div class="container">
    <companyCard
      class="company-card"
      v-for="result in matches"
      :key="result.match.id"
      :flow="$route.params.flow"
      :company="result.match.company"
      :contact="result.match.company.contact"
      :match="result.match"
      :classification="result"
      :requestedSkills="skills"
      @showall="onShowAll"
      @connect="onConnect"
    />

    <div v-if="noRecords" class="no-records">Es wurden leider keine passenden Einträge gefunden.</div>
    <hr class="eof" v-if="endOfRecords" />
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Watch,
  Emit,
  State
} from "nuxt-property-decorator";
import { Context } from "@nuxt/types";

import getDemandMatch from "@/apollo/queries/dashboard/demand.gql";
import getSupplyMatch from "@/apollo/queries/dashboard/supply.gql";

import companyCard from "@/components/match/company.vue";
import { ObservableQuery } from "apollo-client";
import {
  MatchDemandResult,
  Company,
  DemandMatchesQuery,
  DemandMatchesQueryVariables
} from "../../../../apollo/schema";

import { StateChanger } from "vue-infinite-loading";
import { ConnectParams } from "@/pages/connect/request/_.vue";
import { LoadingAnimation } from "../../../../components/loadinganimation";
import { IMatchState, MatchFilter } from "../../../../store/match";
import { IState } from "../../../../store";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.PagesDashboardMatchFlowId,
  components: { companyCard }
})
export default class extends Vue {
  feed: {
    skills?: { [id: string]: boolean };
    query?: ObservableQuery<DemandMatchesQuery, DemandMatchesQueryVariables>;
    data?: MatchDemandResult; // other type is equal
  } = {};

  @Watch('$route.fullPath', {immediate: true})
  scrollTop() {
    const scroller = window.document.getElementById("scroller");
    if (scroller) {
      scroller.scrollTo(0, 0);
    }
  }

  get noRecords() {
    return !this.feed.data || this.feed.data.matches.length === 0;
  }

  get endOfRecords() {
    return (
      !this.noRecords && this.feed.data && !this.feed.data.pageInfo.hasNextPage
    );
  }

  get skills() {
    return this.feed.skills;
  }

  get matches() {
    return this.feed && this.feed.data ? this.feed.data.matches : [];
  }

  onShowAll(match: { id: string; company: string; flow: string }) {
    this.$router.push({
      path: `/dashboard/company/${
        match.flow == "demand" ? "supply" : "demand"
      }/${match.id}`,
      query: {
        // flow: this.$route.params.flow,
        id: this.$route.params.id
      }
    });
  }

  onConnect(party: any) {
    this.$track("dashboard", "connect", "match", "Jetzt verbinden");

    const params: ConnectParams = {
      flow: this.$route.params.flow,
      origin: this.$route.params.id,
      match: party.id,
      firstName: party.firstName,
      lastName: party.lastName,
      pictureUrl: party.pictureUrl
    };

    this.$router.push(`/connect/request/${btoa(JSON.stringify(params))}`);
  }

  @State((s: IState) => s.match.filter)
  filter!: MatchFilter;

  @LoadingAnimation
  @Watch("filter", { deep: true })
  async reload(filter: MatchFilter) {
    this.$track("dashboard", "filter", "KM", filter.range.toString());

    return new Promise<void>((resolve, fail) =>
      this.feed
        .query!.refetch({
          id: this.$route.params.id,
          cursor: undefined,
          radius: filter.range
        })
        .then(data => {
          this.$store.commit("match/newspinner");
          this.$set(this.feed, "data", data.data.result);
          resolve();
        })
        .catch(fail)
    );
  }

  @State((s: IState) => s.match.loadMore)
  loadMore!: StateChanger;

  @State((s: IState) => s.match.triggerLoadMore)
  triggerLoadMore!: StateChanger;

  @Watch("triggerLoadMore")
  onLoadMore() {
    // console.debug("child onLoadMore");
    const $state = this.loadMore;

    if (!this.feed.data!.pageInfo.hasNextPage) {
      $state.complete();
      return;
    }

    this.$track("dashboard", "loadmore");

    this.feed.query!.fetchMore({
      variables: {
        id: this.$route.params.id,
        cursor: {
          offset: this.feed.data!.pageInfo.offset
        },
        radius: this.filter.range
      },

      updateQuery: (prev, { fetchMoreResult }) => {
        try {
          // console.debug(
          //   "Received ",
          //   prev.result.matches.map(m => m.match.id),
          //   prev.result.pageInfo,
          //   (fetchMoreResult?.result?.matches || []).map(m => m.match.id),
          //   fetchMoreResult?.result?.pageInfo
          // );

          if (!fetchMoreResult) {
            $state.complete();
            return prev;
          }

          return Object.assign({}, prev, {
            result: {
              ...prev.result,
              pageInfo: fetchMoreResult.result.pageInfo,
              matches: [
                ...prev.result.matches,
                ...fetchMoreResult.result.matches
              ]
            }
          });
        } finally {
          $state.loaded();
        }
      }
    });
  }

  async asyncData(context: Context) {
    const flow = context.params.flow;
    const id = context.params.id;

    const client = context.app.apolloProvider!.defaultClient;
    const matchQuery = client.watchQuery<
      DemandMatchesQuery,
      DemandMatchesQueryVariables
    >({
      query: flow == "demand" ? getDemandMatch : getSupplyMatch,
      variables: {
        id
      },
      fetchPolicy: "network-only"
    });

    return new Promise((resolve, fail) => {
      const feed = {
        skills: {},
        query: matchQuery,
        data: {}
      };

      matchQuery.subscribe({
        next({ data }) {
          // console.log("received", data);

          feed.skills = (data.request?.skills || []).reduce((p, c) => {
            p[c.id] = true;
            return p;
          }, {} as any);

          feed.data = data.result;
          context.store.commit("match/newspinner");

          // we return first result this way
          resolve({ feed });
        },

        error(e) {
          fail(e);
        }
      });
    });
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/colors";

.container {
  display: flex;
  flex-wrap: wrap;

  margin-left: -20px;
}

.company-card {
  flex: 1 1 650px;
}

.container > .company-card {
  margin-left: 20px;
}

.eof {
  margin-left: 25%;
  width: 50%;
  margin-top: 50px;
  margin-bottom: 50px;
  height: 2px;
  border: 0;
  background-color: $primary;
}
</style>
