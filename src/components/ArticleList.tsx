import { useQuery } from '@apollo/client';
import { styled } from 'styled-components';
import { GET_ARTICLES } from '../api/graphql';
import { AddArticle, ArticleCard } from './ArticleCard';

type Article = {
  articleID: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

type ArticleListProps = {
  showAdder: boolean;
};

export function ArticleList({ showAdder }: ArticleListProps) {
  const { data: { articles } = {}, loading, error } = useQuery(GET_ARTICLES);
  console.log(articles);

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
          content={article.content}
          author={article.author.name}
          createdAt={article.createdAt}
        />
      ))}
    </ArticleContainer>
  );
}

const ArticleContainer = styled.div`
  padding-top: 1rem;
  paddiing-bottom: 1rem;
  max-width: 1188px;
  margin: 0 auto !important;
  margin-bottom: 14px;
  border-bottom: 1px solid #f5f4f0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media (max-width: 1200px) {
    max-width: 1080px;
  }
`;
