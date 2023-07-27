import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { styled } from 'styled-components';
import { ADD_ARTICLE } from '../api/graphql';
import { useNavigate } from 'react-router-dom';

export default function Post() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [addArticle] = useMutation(ADD_ARTICLE, {
    context: { auth: true },
  });
  const nav = useNavigate();

  return (
    <Layout>
      <Title type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Content value={content} onChange={(e) => setContent(e.target.value)} />
      <button
        onClick={async () => {
          console.log('add');
          const { data } = await addArticle({
            variables: {
              title,
              content,
            },
          });
          console.log(data);
          // nav(`/article/${data.article.articleID}`);
        }}
      >
        글 등록
      </button>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.input``;
const Content = styled.textarea``;
