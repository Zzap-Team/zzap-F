import { setContext } from '@apollo/client/link/context';
import { user } from '../store';

const authLink = setContext(async (_, prevContext) => {
  const { accessToken } = user();
  return {
    ...prevContext,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
});
export default authLink;
