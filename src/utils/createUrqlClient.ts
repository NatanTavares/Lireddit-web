import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "@urql/core";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { SSRExchange } from "next-urql";
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  LogoutMutation,
  RegisterUserMutation,
} from "../generated/graphql";

export const createUrqlClient = (ssrExchange: SSRExchange) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
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

          logout: (_result, _, cache) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({
                me: {
                  errors: null,
                  user: null,
                },
              })
            );
          },

          register: (_result, _, cache) => {
            betterUpdateQuery<RegisterUserMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (!result.registerUser.user || !!result.registerUser.errors) {
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
    ssrExchange,
    fetchExchange,
  ],
});
