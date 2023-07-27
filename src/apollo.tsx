import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, makeVar, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { config } from './config';

const authLink = setContext((request, prevContext) => {
  const { accessToken } = store.user();
  return {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
});

const debugLink = new ApolloLink((operation, forward) => {
  return forward(operation);
});

const directionalLink = new ApolloLink((operation, forward) => forward(operation)).split(
  (operation) => operation.getContext().auth === true,
  // resource
  from([
    authLink,
    new HttpLink({
      uri: CONFIG.API_URL,
      credentials: 'include',
    }),
  ]),
  // auth
  new HttpLink({
    uri: CONFIG.API_URL,
    credentials: 'include',
  }),
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: directionalLink,
});

export const store = {
  user: makeVar({
    loggedIn: false,
    accessToken: undefined,
    refreshToken: undefined,
  }),
};
