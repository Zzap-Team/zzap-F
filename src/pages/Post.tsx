import { useState } from 'react';
import { styled } from 'styled-components';
import { ADD_ARTICLE, GET_ARTICLES } from '../api/graphql';
import { useNavigate } from 'react-router-dom';
import { Main } from './Layout';
import useAuthMutation from '../hooks/useAuthMutation';

export default function Post() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [addArticle, { loading }] = useAuthMutation(ADD_ARTICLE, {
    refetchQueries: [GET_ARTICLES],
  });
  const nav = useNavigate();

  return (
    <Main>
      <Layout>
        <Title type="text" value={title} placeholder="제목을 입력하세요!" onChange={(e) => setTitle(e.target.value)} />
        <Description
          type="text"
          value={description}
          placeholder="글의 간략한 개요를 적어주세요."
          onChange={(e) => setDescription(e.target.value)}
        />
        <Content value={content} placeholder="당신의 마음을 적어주세요." onChange={(e) => setContent(e.target.value)} />
        <AddArticleButton
          onClick={async () => {
            const { data } = await addArticle({
              variables: {
                title,
                content,
                description,
              },
            });
            const article = data.createArticle;
            nav(`/article/${article.articleID}`);
          }}
        >
          {loading ? '등록중...' : '등록하기'}
        </AddArticleButton>
      </Layout>
    </Main>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddArticleButton = styled.button`
  font-size: 1.5rem;
  height: 2.5rem;

  border: none;
  background-color: #dcdcdc;

  &:hover {
    background-color: #e6e4e4;
  }
`;

const Description = styled.input`
  width: 32rem;
  font-size: 1rem;

  background-color: transparent;
  border-width: 0 0 0.5rem 0;
  border-style: solid;
  border-color: #dcdcdc;
  outline: none;
`;

const Title = styled.input`
  width: 32rem;
  font-size: 2rem;
  margin: 3rem;

  background-color: transparent;
  border-width: 0 0 0.5rem 0;
  border-style: solid;
  border-color: #dcdcdc;
  outline: none;
`;

const Content = styled.textarea`
  width: 32rem;
  height: 30rem;
  font-size: 1rem;

  background-color: transparent;
  outline: none;
`;
