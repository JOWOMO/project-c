<template>
  <div class='container'>
    <companyCard
      v-for="result in matches"
      :key="result.match.id"

      :company="result.match.company"
      :contact="result.match.company.contact"
      :match="result.match"
      :classification="result"
    />

    <infinite @infinite="loadMore" :distance="500"></infinite>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
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

@Component({
  components: { companyCard, infinite }
})
export default class extends Vue {
  feed: {
    query?: ObservableQuery<DemandMatchesQuery, DemandMatchesQueryVariables>;
    data?: MatchDemandResult; // other type is equal
  } = {};

  get matches() {
    return this.feed && this.feed.data ? this.feed.data.matches : [];
  }

  // // detect scroll position
  // scroll() {
  //   window.onscroll = () => {
  //     let bottomOfWindow =
  //       document.documentElement.scrollTop + window.innerHeight ===
  //       document.documentElement.offsetHeight;

  //     if (bottomOfWindow) {
  //       this.fetchMore();
  //     }
  //   };
  // }

  // mounted() {
  //   this.scroll();
  // }

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
        }
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

.container {
  padding: 20px;
  padding-top: 0px;
}
</style>
