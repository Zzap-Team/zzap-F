import { useQuery } from '@apollo/client';

export default function useAuthQuery(query: any, options?: any) {
  if (!options) options = {};
  const authCtx = { ...options?.context, auth: true };
  const result = useQuery(query, { context: authCtx });
  return result;
}
