import { useMutation } from '@apollo/client';

const useAuthMutation = (mutation: any, options?: any): any => {
  const authCtx = { ...options?.context, auth: true };
  const _useAuthMutation = useMutation(mutation, { ...options, context: authCtx });
  return _useAuthMutation;
};

export default useAuthMutation;
