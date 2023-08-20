import { makeVar } from '@apollo/client';

export const user = makeVar({
  uid: undefined,
  loggedIn: false,
  name: undefined,
  accessToken: undefined,
});
