import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { GET_ARTICLE } from '../api/graphql';
import { useQuery } from '@apollo/client';
import { Main } from './Layout';
import { formatDate } from '../helper/date';

export default function Article() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_ARTICLE, { variables: { id: parseInt(id) } });
  if (error) console.log(error);
  console.log(data);
  return (
    <Main>
      {loading || (
        <ArticleWrapper>
          <Title>{data.article.title}</Title>
          <Info>
            <Name>{`by ${data.article.author.name}`}</Name>
            <CreateAt>{formatDate(new Date(data.article.createdAt))}</CreateAt>
          </Info>
          <Content>{data.article.content}</Content>
        </ArticleWrapper>
      )}
    </Main>
  );
}

const ArticleWrapper = styled.div`
  width: 95%;
`;

const Title = styled.h1``;

const Info = styled.p``;

const Name = styled.span`
  font-weight: bold;
`;

const CreateAt = styled.span`
  margin-left: 1rem;
`;

const Content = styled.p``;
