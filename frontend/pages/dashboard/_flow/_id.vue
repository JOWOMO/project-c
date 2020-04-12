<template>
  <div class="container">
    <companyCard
      v-for="result in matches"
      :key="result.match.id"
      :flow="$route.params.flow"
      :company="result.match.company"
      :contact="result.match.company.contact"
      :match="result.match"
      :classification="result"
      @showall="onShowAll"
      @connect="onConnect"
    />

    <infinite :identifier="spinnerid" spinner="waveDots" @infinite="loadMore" :distance="500">
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite>

    <div v-if="noRecords" class="no-records">Es wurden leider keine passenden Einträge gefunden.</div>
    <hr class="eof" v-if="endOfRecords" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";

import getDemandMatch from "@/apollo/queries/dashboard/demand.gql";
import getSupplyMatch from "@/apollo/queries/dashboard/supply.gql";

import companyCard from "@/components/match/company.vue";
import { loadMatch } from "../dataloader";
import { ObservableQuery } from "apollo-client";
import {
  MatchDemandResult,
  Company,
  GetDemandsQuery,
  GetDemandsQueryVariables,
  DemandMatchesQuery,
  DemandMatchesQueryVariables
} from "../../../apollo/schema";

import infinite, { StateChanger } from "vue-infinite-loading";
import { ConnectParams } from "@/pages/connect/_.vue";
import { Filter, DEFAULT_FILTER } from "~/components/filter.vue";
import { LoadingAnimation } from "../../../components/loadinganimation";

@Component({
  components: { companyCard, infinite }
})
export default class extends Vue {
  feed: {
    query?: ObservableQuery<DemandMatchesQuery, DemandMatchesQueryVariables>;
    data?: MatchDemandResult; // other type is equal
  } = {};

  @Prop({ required: true }) filter!: Filter;
  spinnerid = 1;
  
  get noRecords() {
    return !this.feed.data || this.feed.data.matches.length === 0;
  }

  get endOfRecords() {
    return !this.noRecords && this.feed.data && !this.feed.data.pageInfo.hasNextPage;
  }

  get matches() {
    return this.feed && this.feed.data ? this.feed.data.matches : [];
  }

  @Watch("filter", { deep: true })
  filterChanged(filter: Filter) {
    this.reload(filter);
  }

  onShowAll(company: string) {
    // this.$router.push(`/dashboard/demand/${this.dem[0].id}`);
  }

  onConnect(party: any) {
    const params: ConnectParams = {
      flow: this.$route.params.flow,
      origin: this.$route.params.id,
      match: party.id,
      name: party.name,
      pictureUrl: party.pictureUrl
    };

    this.$router.push(`/connect/${btoa(JSON.stringify(params))}`);
  }

  @LoadingAnimation
  async reload(filter: Filter) {
    return new Promise(resolve =>
      this.feed
        .query!.refetch({
          id: this.$route.params.id,
          cursor: undefined,
          radius: this.filter.range
        })
        .then(data => {
          this.spinnerid += 1;
          this.$set(this.feed, "data", data.data.result);
          resolve();
        })
        .catch(resolve)
    );
  }

  loadMore($state: StateChanger) {
    if (!this.feed.data!.pageInfo.hasNextPage) {
      $state.complete();
      return;
    }

    this.feed.query!.fetchMore({
      variables: {
        id: this.$route.params.id,
        cursor: {
          offset: this.feed.data!.pageInfo.offset
        },
        radius: DEFAULT_FILTER.range
      },

      updateQuery: (prev, { fetchMoreResult }) => {
        try {
          console.debug(
            "Received ",
            prev.result.matches.map(m => m.match.id),
            prev.result.pageInfo,
            (fetchMoreResult?.result?.matches || []).map(m => m.match.id),
            fetchMoreResult?.result?.pageInfo
          );

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

    try {
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

      return new Promise(resolve => {
        const feed = {
          query: matchQuery,
          data: {}
        };

        matchQuery.subscribe(({ data }) => {
          console.log("received", data);
          feed.data = data.result;

          // we return first result this way
          resolve({ feed });
        });
      });
    } catch (e) {
      console.error(e);
      context.error({ statusCode: 500, message: e.message });
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/colors';

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
