import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, from } from '@apollo/client';
import { CONFIG } from './config';
import refreshAccessTokenLink from './apollo/links/refreshAccessToken';
import authLink from './apollo/links/auth';

const directionalLink = new ApolloLink((operation, forward) => forward(operation)).split(
  (operation) => operation.getContext().auth === true,
  from([
    refreshAccessTokenLink,
    authLink,
    new HttpLink({
      uri: CONFIG.API_URL,
      credentials: 'include',
    }),
  ]),
  new HttpLink({
    uri: CONFIG.API_URL,
    credentials: 'include',
  }),
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: directionalLink,
});
