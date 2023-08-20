import { useQuery } from '@apollo/client';

export default function useAuthQuery(query) {
  const result = useQuery(query, {
    context: {
      auth: true,
    },
  });
  return result;
}
