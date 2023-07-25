import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { GET_ARTICLE } from '../api/graphql';
import { useQuery } from '@apollo/client';

export default function Article() {
  const params = useParams();
  const { data, loading, error } = useQuery(GET_ARTICLE, { variables: { id: params.id } });

  if (loading) return <div>loading...</div>;
  if (error) console.log(error);
  return (
    <ArticleLayout>
      <Title>{data.article.title}</Title>
      <Content>{data.article.content}</Content>
    </ArticleLayout>
  );
}

const ArticleLayout = styled.div``;
const Title = styled.h2``;
const Content = styled.div``;
