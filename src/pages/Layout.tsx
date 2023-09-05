import { useReactiveVar } from '@apollo/client';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { CONFIG } from '../config';
import useAuthQuery from '../hooks/useAuthQuery';
import { GET_ME, LOGOUT } from '../api/graphql';
import { user } from '../apollo/store';
import useAuthMutation from '../hooks/useAuthMutation';

export const Main = ({ children }) => {
  return (
    <MainLayout>
      <Header />
      {children}
    </MainLayout>
  );
};

const MainLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const Header = () => {
  const { data, loading, error } = useAuthQuery(GET_ME, {
    context: {
      errorAlert: 'none',
    },
  });
  const [logout, { loading: logoutLoading }] = useAuthMutation(LOGOUT);
  const { loggedIn } = useReactiveVar(user);

  return (
    <Head>
      <Logo to={'/'}>쨉로그</Logo>
      {!loading && loggedIn ? (
        <Wrapper>
          <MyName>@{data.me.name}</MyName>
          <LogoutButton
            onClick={() => {
              logout().then(() => {
                user({
                  loggedIn: false,
                  name: undefined,
                  accessToken: undefined,
                  uid: undefined,
                });
                window.localStorage.removeItem('is-logged-in');
              });
            }}
          >
            {logoutLoading ? '로그아웃중...' : '로그아웃'}
          </LogoutButton>
        </Wrapper>
      ) : (
        <LoginButton href={CONFIG.GITHUB_OAUTH}>로그인</LoginButton>
      )}
    </Head>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-family: 'ChosunLo';
  color: black;

  text-decoration: none;

  margin-left: 1rem;
`;
const MyName = styled.a`
  height: 2rem;
  margin-right: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 1rem;
  color: white;
  background-color: black;
  border: solid 1px black;
  &:hover{
    color: black;
    background-color: white;
    cursor: pointer;
  }
`;

const LogoutButton = styled.button`
  height: 2rem;
  /* margin-right: 1rem; */
  padding-left: 1rem;
  padding-right: 1rem;
  
  font-size: 1rem;
  font-weight: bold;
 
  text-decoration: none;

  border-radius: 1rem;
  background-color: black;
  border: solid 1px black;
  color: white;
  &:hover{
    color: black;
    background-color: white;
    cursor: pointer;
  }
`;

const LoginButton = styled.a`
  height: 2rem;
  /* margin-right: 1rem; */
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: black;

  display: flex;
  align-items: center;
  justify-content: center;

  align-self: center;

  font-size: 1rem;
  font-weight: bold;
  color: white;
  text-decoration: none;

  border-radius: 1rem;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  margin: 1rem;
`;
