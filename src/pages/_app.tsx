import { createClient, debugExchange, fetchExchange, Provider } from "urql";
import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import { ChakraProvider } from "@chakra-ui/react";
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  RegisterUserMutation,
} from "../generated/graphql";
import type { AppProps } from "next/app";
import { theme } from "../styles/theme";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  fn: (res: Result, query: Query) => Query
) {
  return cache.updateQuery(
    queryInput,
    (data) => fn(result, data as any) as any
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  const client = createClient({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include",
    },
    exchanges: [
      debugExchange,
      cacheExchange({
        updates: {
          Mutation: {
            login: (_result, _, cache) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (!result.login.user || !!result.login.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login,
                    };
                  }
                }
              );
            },

            register: (_result, _, cache) => {
              betterUpdateQuery<RegisterUserMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (
                    !result.registerUser.user ||
                    !!result.registerUser.errors
                  ) {
                    return query;
                  } else {
                    return {
                      me: result.registerUser,
                    };
                  }
                }
              );
            },
          },
        },
      }),
      fetchExchange,
    ],
  });

  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
