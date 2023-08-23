import { setContext } from '@apollo/client/link/context';
import { user } from '../store';

const authLink = setContext(async (request, prevContext) => {
  const { accessToken } = user();
  return {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
});
export default authLink;
