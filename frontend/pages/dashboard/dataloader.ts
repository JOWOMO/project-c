import { Vue, Component } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";

import getDemandMatch from "@/apollo/queries/dashboard/demand.gql";
import getSupplyMatch from "@/apollo/queries/dashboard/supply.gql";
import { MatchDemandResult, MatchSupplyResult } from "~/apollo/schema";
import {
    ApolloQueryResult,
    QueryOptions,
    OperationVariables,
} from 'apollo-client';

type Match = MatchDemandResult | MatchSupplyResult;
type Client = {
    query<R = any, TVariables = OperationVariables>(options: QueryOptions<TVariables>): Promise<ApolloQueryResult<R>>
};

export async function loadMatch(client: Client, flow: string, id: string): Promise<Match[]> {
    const result = await client.query({
        query: flow == "demand" ? getDemandMatch : getSupplyMatch,
        variables: {
            id
        },
        fetchPolicy: "network-only",
    });

    console.log('Received', result);
    return result.data.result.matches;
}

