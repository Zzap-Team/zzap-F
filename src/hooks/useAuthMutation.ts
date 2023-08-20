import {
  MutationTuple,
  ApolloCache,
  DefaultContext,
  DocumentNode,
  MutationHookOptions,
  OperationVariables,
  TypedDocumentNode,
  useMutation,
} from '@apollo/client';

const useAuthMutation = (
  mutation: DocumentNode | TypedDocumentNode<any, OperationVariables>,
  options?: MutationHookOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> | undefined,
): MutationTuple<any, OperationVariables, DefaultContext, ApolloCache<any>> => {
  const authCtx = { ...options?.context, auth: true };
  const _useAuthMutation = useMutation(mutation, { ...options, context: authCtx });
  return _useAuthMutation;
};

export default useAuthMutation;
