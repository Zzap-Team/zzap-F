import { styled } from 'styled-components';
import { ArticleList } from '../components/ArticleList';
import { useReactiveVar } from '@apollo/client';
import { store } from '../apollo';

// 1. 디자인
// 2. 아폴로... 아폴로 담배 처럼 생긴 과자

export default function Root() {
  const user = useReactiveVar(store.user);

  return (
    <RootContainer>
      <Head>
        <p>zzAPlog</p>
        {user.accessToken ? (
          <p>hacho님</p>
        ) : (
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${
              import.meta.env.VITE_REDIRECT_URL + '/github'
            }`}
          >
            로그인
          </a>
        )}
      </Head>
      <ArticleList showAdder={true} />
    </RootContainer>
  );
}

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
`;
