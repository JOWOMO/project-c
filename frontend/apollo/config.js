import { setContext } from "apollo-link-context";

export default function (context) {

  const authLink = setContext(async (_, { headers }) => {
    // Use your async token function here:
    const token = await context.app.store.dispatch('auth/getIdToken');

    // Return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token,
      }
    };
  });

  return {
    httpEndpoint: process.env.endpoint,

    httpLinkOptions: {
      fetchOptions: {
        mode: 'cors'
      },
    },

    apollo: {

    },

    link: authLink,
    persisting: false,
  };
}
