import { DocumentNode, useApolloClient } from '@apollo/client';
import { useMemo, useRef, useEffect } from 'react';

enum SuspenseState {
  Pending,
  Error,
  Success,
}

type Query = DocumentNode;

function useWrapPromise(promise: Promise<any>) {
  const state: React.MutableRefObject<SuspenseState> = useRef(SuspenseState.Pending);
  const result: React.MutableRefObject<null | object> = useRef(null);
  const error: React.MutableRefObject<null | Error> = useRef(null);
  const suspender = promise
    .then((response) => {
      state.current = SuspenseState.Success;
      result.current = response;
    })
    .catch((err) => {
      state.current = SuspenseState.Error;
      error.current = err;
    });

  return { suspender, state: state.current, result: result.current, error: error.current };
}

function useGraphqlQuery(query: Query) {
  const client = useApolloClient();
  const { suspender, state, error, result } = useWrapPromise(
    client.query({
      query: query,
      fetchPolicy: 'cache-first', // not using cache, but store cache storage
    }),
  );

  return {
    read() {
      if (state === SuspenseState.Pending) throw suspender;
      else if (state === SuspenseState.Error) throw error;
      else if (state === SuspenseState.Success) return result;
    },
  };
}
export { useGraphqlQuery };

// function useGraphqlMutate(query) {
//   const client = useApolloClient();
//   const promise = client.query();
// }
