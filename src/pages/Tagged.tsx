import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { theme } from '../styles/theme';
import { GET_TAG } from '../api/graphql';
import { useQuery } from '@apollo/client';
import { Main } from './Layout';
import { formatDate } from '../helper/date';
import { MDXconverter } from '../components/MDEditor/mdx';


export default function Tagged() {
  const { name } = useParams();
  const { data, loading, error } = useQuery(GET_TAG, { variables: { name: name } });
  if (error) console.log(error);
  const nav = useNavigate();
  loading || console.log(data)
  return (
    <Main>
      {loading || (
        <TaggedWrapper> 
          <h1># {name}</h1>
          <div>총 {data.tag.articles.length}개의 포스트</div>
          {
          data.tag.articles.map((article) => {
            return (
              <Article key={article.articleID}>
                <Title onClick={() => nav(`/article/${article.articleID}`)}>{article.title}</Title>
                <Description>{article.description}</Description>
                <Tags>
                  {
                    article.tags.map((tag) => {
                      return <Tag key={tag.name} onClick={() => nav(`/tag/${tag.name}`)}>{tag.name}</Tag>
                    })
                  }
                </Tags>
                <CreateAt>{formatDate(new Date(article.createdAt))}</CreateAt>
              </Article>
            );
           
          })
        }
          
        </TaggedWrapper>
      )}
    </Main>
  );
}

const TaggedWrapper = styled.div`
  width: 700px;
  @media (max-width: 700px) {
    width: 100%;
  }
  margin: auto 0;
`;

const Title = styled.h1`
  cursor: pointer;
`;

const Article = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 10px 10px;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 40px;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0px;
`;

const Tag = styled.div`
  height: 28px;
  background-color: #66FF99;
  border-radius: 15px;
  border: 2px solid black;
  margin-right: 10px;
  padding: 0px 10px;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
  &:hover{
    background-color: green;
  }
`;

const Description = styled.p`
  margin: 0 0 15px 10px;
`;

const Author = styled.p`
  font-weight: bold;
`;

const CreateAt = styled.p`
  color: gray;
`;
