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

export function ArticleCard({ articleID, title, content, author, createdAt, img = '' }: ArticleCardProps) {
  const nav = useNavigate();

  return (
    <ArticleCardWrapper onClick={() => nav(`/article/${articleID}`)}>
      {img !== '' && (
        <Image>
          <img src={img} alt="이미지 영역"></img>
        </Image>
      )}
      <ArticleInfo>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <CreatedAt>{createdAt}</CreatedAt>
      </ArticleInfo>
      <UserInfo>
        <Author>{`by ${author}`}</Author>
      </UserInfo>
    </ArticleCardWrapper>
  );
}

const ArticleCardWrapper = styled.div`
  width: 340px;
  height: 400px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bg2};
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  margin: 21px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 5px 15px 20px rgba(0, 0, 0, 0.3);
  }
`;

const Image = styled.div`
  width: 100%;
  padding-top: 60%;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ArticleInfo = styled.div`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const UserInfo = styled.div`
  margin-top: auto;
  border-top: 1px solid black;
  display: flex;
  flex-direction: row;
  padding: 0 10px;
`;

const Title = styled.h4`
  text-align: left;
  overflow: hidden;
  font-size: 24px;
  margin: 0px 0px 0.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Content = styled.p`
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2rem;
  height: 3.6rem;
`;

const Author = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CreatedAt = styled.p`
  margin-top: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
