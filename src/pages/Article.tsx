import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { theme } from '../styles/theme';
import { GET_ARTICLE, GET_ARTICLES, DELETE_ARTICLE } from '../api/graphql';
import useAuthMutation from '../hooks/useAuthMutation';
import { useQuery } from '@apollo/client';
import { Main } from './Layout';
import {MDXconverter} from '../components/MDEditor/mdx';
import { formatDate } from '../helper/date';


export default function Article() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_ARTICLE, { variables: { id: parseInt(id) } });
  const [deleteArticle, { loading2 }] = useAuthMutation(DELETE_ARTICLE, {
    refetchQueries: [GET_ARTICLES],
  });
  if (error) console.log(error);
  let tags = [];
  if(!loading)
    tags = data.article.tags.map((tag) => { return tag.name });
  const nav = useNavigate();
  return (
    <Main>
      {loading || (
        <ArticleWrapper>
          <Title>{data.article.title}</Title>
          <Tags>
              {tags.map((tag) => {
                return <Tag>{tag}</Tag>
              })}
            </Tags>
          <Info>
            <Name>{`by ${data.article.author.name}`}</Name>
            <CreateAt>{formatDate(new Date(data.article.createdAt))}</CreateAt>
            <Edit>
              <Modify
              onClick={async () => {
                nav('/post', {
                  state: {
                    title: data.article.title,
                    content: data.article.content,
                    description: data.article.description,
                    id: id,
                    tags: tags,
                  }
                });
              }}
              >수정</Modify>
              <Delete
              onClick={async (e)  => {
                if(confirm("삭제하시겠습니까?")){
                const { data } = await deleteArticle({
                  variables: {
                    articleID: Number(id),
                  },
                });
                nav(`/`);
                  }
                
               else{
                e.preventDefault();
               }
              }}
              >삭제</Delete>
            </Edit>
          </Info>
          <Content>{MDXconverter(data.article.content)}</Content>
        </ArticleWrapper>
      )}
    </Main>
  );
}

const ArticleWrapper = styled.div`
  width: 95%;
`;

const Title = styled.h1``;

const Info = styled.div`
display: flex;
flex-direction: row;
margin-bottom: 10px;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
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

const Name = styled.span`
  font-weight: bold;
`;

const CreateAt = styled.span`
  margin-left: 1rem;
`;

const Edit = styled.div`
  margin-left: auto;
  color: #666666;
  :hover{
    color: black;
  }
`;

const Modify = styled.span`
  cursor: pointer;
`;

const Delete = styled.span`
  margin-left: 1rem;
  cursor: pointer;
`;


const Content = styled.div``;
