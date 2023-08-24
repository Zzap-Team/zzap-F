import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { CONFIG } from '../../config';
import { GET_ACCESSTOKEN } from '../../api/graphql';
import { user } from '../store';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: CONFIG.API_URL,
  credentials: 'include',
});

const handleExpiredAccessTokenError = onError(({ operation, graphQLErrors, forward }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      if (error.extensions.code === 'UNAUTHENTICATED' && error.message === 'Access token is expired') {
        operation.setContext({
          ...operation.getContext(),
          refresh: true,
        });
        return forward(operation);
      }
    }
  }
});

const refresh = setContext(async (_, prevContext) => {
  if (prevContext.refresh) {
    const { data, errors } = await client.mutate({ mutation: GET_ACCESSTOKEN, errorPolicy: 'all' });
    if (data) {
      user({
        ...user(),
        loggedIn: true,
        accessToken: data.getAccessToken,
      });
    } else if (errors) {
      for (const error of errors) {
        if (error.message == 'Can not find refresh token' || error.message == 'Refresh token is expired') {
          if (prevContext.errorAlert !== 'none') alert('토큰이 만료되었습니다. 다시 로그인 해주세요.');
          user({
            loggedIn: false,
            accessToken: undefined,
            uid: undefined,
            name: undefined,
          });
        }
      }
    }
  }
  return { ...prevContext, refresh: false };
});

const refreshAccessTokenLink = from([handleExpiredAccessTokenError, refresh]);
export default refreshAccessTokenLink;
