import { useMutation } from '@apollo/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { GET_ME, GITHUB_LOGIN } from '../api/graphql';
import useAuthQuery from '../hooks/useAuthQuery';
import { user } from '../apollo/store';

export default function Login() {
  const nav = useNavigate();
  const { data } = useAuthQuery(GET_ME);

  useEffect(() => {
    if (data) {
      const newUser = {
        ...user(),
        name: data.me.name,
      };
      user(newUser);
      nav('/');
    }
  }, [data, nav]);

  return <></>;
}

export function GithubAuth() {
  const [params] = useSearchParams();
  const [login] = useMutation(GITHUB_LOGIN);
  const nav = useNavigate();

  useEffect(() => {
    const authCode = params.get('code');
    login({ variables: { authCode } })
      .then(({ data: { signinWithGithub: tokens } }) => {
        // return tokens;
        user({
          ...user(),
          loggedIn: true,
          accessToken: tokens.accessToken,
        });
        window.localStorage.setItem('is-logged-in', 'true');
        nav('/login');
      })
      .catch((error) => {
        // TODO: handle authcode is expired
        console.log(error);
      });
  }, [login, params, nav]);

  return <></>;
}