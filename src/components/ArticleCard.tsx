import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { GET_ARTICLES } from '../api/graphql';

type Article = {
  articleID: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

type ArticleCardProps = {
  articleID: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
};

type ArticleListProps = {
  showAdder: boolean;
};

export function ArticleList({ showAdder }: ArticleListProps) {
  const { data: { articles } = {}, loading, error } = useQuery(GET_ARTICLES);

  if (error) throw error;
  if (loading) <div>loding...</div>;
  return (
    <ArticleContainer>
      {showAdder && <AddArticle />}
      {articles?.map((article: Article) => (
        <ArticleCard
          key={article.articleID}
          articleID={article.articleID}
          title={article.title}
          description={article.content}
          author={'데베에아직없어'}
          createdAt={article.createdAt}
        />
      ))}
    </ArticleContainer>
  );
}

const ArticleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 70rem;
`;

export function AddArticle() {
  const nav = useNavigate();

  return (
    <ArticleCardWrapper onClick={() => nav('post')}>
      <AdderIcon>+</AdderIcon>
    </ArticleCardWrapper>
  );
}

const AdderIcon = styled.span`
  text-align: center;
  font-size: 15rem;
`;

export function ArticleCard({ articleID, title, description, author, createdAt }: ArticleCardProps) {
  const nav = useNavigate();

  return (
    <ArticleCardWrapper onClick={() => nav(`article/${articleID}`)}>
      <Title>{title}</Title>
      <Description>{description}...</Description>
      <Author>{`by ${author}`}</Author>
      <CreatedAt>{createdAt}</CreatedAt>
    </ArticleCardWrapper>
  );
}

const ArticleCardWrapper = styled.div`
  width: calc(100% / 3.3);
  height: 25rem;
  border-radius: 4px;
  background-color: ${(props) => props.theme.bg2};
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  user-select: none;
`;

const Title = styled.h4`
  text-align: center;
`;

const Description = styled.p`
  text-align: center;
`;

const Author = styled.p`
  text-align: center;
`;

const CreatedAt = styled.p`
  text-align: center;
`;
