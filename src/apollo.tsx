import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, createHttpLink, makeVar, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((request, prevContext) => {
  return {
    headers: {
      ...prevContext.headers,
      authorization: `Bearer ${'sampletoken'}`,
    },
  };
});

const debugLink = new ApolloLink((operation, forward) => {
  return forward(operation);
});

const directionalLink = new ApolloLink((operation, forward) => {
  return forward(operation);
}).split(
  (operation) => operation.getContext().auth === true,
  // resource
  from([
    authLink,
    new HttpLink({
      uri: 'http://localhost:3000/graphql',
      credentials: 'include',
    }),
  ]),
  // token
  new HttpLink({
    uri: 'http://localhost:3000/graphql',
    credentials: 'include',
  }),
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: directionalLink,
});

export const store = {
  user: makeVar({
    accessToken: undefined,
    refreshToken: undefined,
  }),
};
