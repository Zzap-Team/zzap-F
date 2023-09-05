import { styled } from 'styled-components';
import { ArticleList } from '../components/ArticleList';
import { useQuery, useReactiveVar } from '@apollo/client';
import { Main } from './Layout';
import { user } from '../apollo/store';
import { GET_ARTICLES } from '../api/graphql';
import GridList from '../components/GridList';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../helper/date';

type Article = {
  articleID: string;
  title: string;
  content: string;
  description: string;
  author: string;
  createdAt: string;
};

type ArticleListProps = {
  showAdder: boolean;
};

type ArticleCardProps = {
  articleID: string;
  title: string;
  description: string;
  author: object;
  createdAt: string;
};

const ArticleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 70rem;
`;

export default function Root() {
  const { loggedIn } = useReactiveVar(user);
  const { data, loading, error } = useQuery(GET_ARTICLES);

  if (loading || error) return <></>;
  const articles = data.articles.articles;
  return (
    <Main>
      <GridList
        column={3}
        items={[
          loggedIn && <AddArticle key="adder" />,
          ...articles.map((article: Article) => (
            <ArticleCard
              key={article.articleID}
              articleID={article.articleID}
              title={article.title}
              description={article.description}
              author={article.author.name}
              createdAt={article.createdAt}
            />
          )),
        ]}
      />
    </Main>
  );
}

export function ArticleCard({ articleID, title, author, description, createdAt }: ArticleCardProps) {
  const nav = useNavigate();

  return (
    <ArticleCardWrapper onClick={() => nav(`/article/${articleID}`)}>
      <Image
        src={'https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg'}
        alt="이미지 영역"
      />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Info>
        <Author>{`by ${author}`}</Author>
        <CreatedAt>{formatDate(new Date(createdAt))}</CreatedAt>
      </Info>
    </ArticleCardWrapper>
  );
}

const ArticleCardWrapper = styled.div`
  /* flex option */
  display: flex;
  flex-direction: column;

  /* box option */
  width: 20rem;
  /* height: 400px; */
  /* overflow: hidden; */
  border-radius: 10px;

  /* color */
  background-color: ${(props) => props.theme.bg2};

  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 5px 15px 20px rgba(0, 0, 0, 0.3);
  }
`;

const Image = styled.img``;

const Info = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 0 1rem 0.5rem 1rem;
`;

const Title = styled.h4`
  margin: 1rem 1rem 0.5rem 1rem;
  font-weight: bold;
`;

const Description = styled.p`
  margin: 0 1rem 0.5rem 1rem;
`;

const Author = styled.p`
  font-weight: bold;
`;

const CreatedAt = styled.p``;

export function AddArticle() {
  const nav = useNavigate();

  return (
    <ArticleCardWrapper onClick={() => nav('post', {
      state: {
        title: '',
        content: '',
        description: '',
      }
    })}>
      <AdderIcon>+</AdderIcon>
    </ArticleCardWrapper>
  );
}

const AdderIcon = styled.span`
  text-align: center;
  font-size: 15rem;
`;
