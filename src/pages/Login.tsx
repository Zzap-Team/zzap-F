import { gql, useMutation, useReactiveVar } from '@apollo/client';
import { Navigate, createSearchParams, useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { store } from '../apollo';
import { useEffect } from 'react';
import { GITHUB_LOGIN, LOGIN } from '../api/graphql';

export default function Login() {
  // const user = useReactiveVar(store.user);
  const login = useLoaderData();

  return (
    <button
      onClick={() => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${
          import.meta.env.VITE_CLIENT_ID
        }&redirect_uri=${import.meta.env.VITE_REDIRECT_URL}`;
      }}
    >
      test
    </button>
  );
  if (loading) return <div>로그인...</div>;
  if (error) return <div>error: {error.message}</div>;
  // return <></>;
  // return <Navigate to="/"></Navigate>;
}

export function GithubAuth() {
  const [params] = useSearchParams();
  const [login] = useMutation(GITHUB_LOGIN);
  const nav = useNavigate();

  useEffect(() => {
    const authCode = params.get('code');
    login({ variables: { authCode } })
      .then(({ data: { signinWithGithub: tokens } }) => {
        store.user({
          loggedIn: true,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });
        window.localStorage.setItem('LOGGED_IN', 'true');
        nav('/');
      })
      .catch((error) => {
        // TODO: handle authcode is expired
        console.log(error);
      });
  }, [login, params]);

  // store.user({
  //   accessToken:
  // })
  // login({ variables: { authCode } });
  return <></>;
  return <Navigate to="/login"></Navigate>;
}
