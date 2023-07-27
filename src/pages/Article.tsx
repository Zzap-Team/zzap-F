import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { GET_ARTICLE } from '../api/graphql';
import { useQuery } from '@apollo/client';

export default function Article() {
  const img = 'temp.png';
  const { id } = useParams();
  const { data: { article } = {}, loading, error } = useQuery(GET_ARTICLE, { variables: { id } });
  if (loading) return <div>loading...</div>;
  if (error) console.log(error);
  console.log(article);
  return (
    <ArticleWrapper>
      <ArticleDetail>
        <ImageBox>
          <img alt="이미지 영역" src={`../${img}`}></img>
        </ImageBox>
        <ArticleInfo>
          <Title>{article.title}</Title>
          <Info>{`${article.author.name} . ${article.createdAt}`}</Info>
        </ArticleInfo>
      </ArticleDetail>

      <Content>{article.content}</Content>
    </ArticleWrapper>
  );
}

const ArticleWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto !important;
  display: flex;

  flex-direction: column;
  align-items: center;
`;

const ArticleDetail = styled.div`
  width: 100%;
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  align-items: start;
  flex: 1;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const ImageBox = styled.div`
  width: 250px;
  padding-top: 0%;
  overflow: hidden;
  img {
    width: 100%;
    border-radius: 20px;
    top: 0%;
    left: 0%;
  }
`;

const ArticleInfo = styled.div`
  display: flex;
  flex: 1;
  margin-left: 016px;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 700px) {
    margin-left: 6px;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 36px;
  text-align: left;
`;

const Description = styled.h2`
  font-size: 20px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 20px;
  margin: 10px 0;
  max-height: 40px;
`;

const Info = styled.p`
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
`;

const Content = styled.p`
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  word-wrap: break-word;
`;
