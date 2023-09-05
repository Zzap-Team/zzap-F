import { useState } from 'react';
import { styled } from 'styled-components';
import { ADD_ARTICLE, GET_ARTICLE, GET_ARTICLES, UPDATE_ARTICLE, ADD_TAG } from '../api/graphql';
import { useNavigate, useLocation } from 'react-router-dom';
import { Main } from './Layout';
import useAuthMutation from '../hooks/useAuthMutation';
import {MDEditor} from '../components/MDEditor/MDEditor';
import {MDXconverter} from '../components/MDEditor/mdx';

export default function Post() {
  const location = useLocation();
  const [title, setTitle] = useState(location.state.title);
  const [content, setContent] = useState(location.state.content);
  const [description, setDescription] = useState(location.state.description);
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState(location.state.tags);
  const [addArticle, { loading }] = useAuthMutation(ADD_ARTICLE, {
    refetchQueries: [GET_ARTICLES],
  });
  const [addTag, { loading3 }] = useAuthMutation(ADD_TAG, {
   //TODO: GET_ARTICLE refetch
    refetchQueries: [GET_ARTICLE],
  });
  const [updateArticle, { loading2 }] = useAuthMutation(UPDATE_ARTICLE, {
    refetchQueries: [{
      query: GET_ARTICLE,
      variables: { id: Number(location.state.id), }
    }, GET_ARTICLES],
  });

  const nav = useNavigate();
  const contentFunction = (text) => {
    setContent(text);
  }
  return (
    <Main>
      <Layout>
        <Editor>
          <Title type="text" value={title} placeholder="제목을 입력하세요!" onChange={(e) => setTitle(e.target.value)} />
          <Tags>
            {tags.map((tag) => {
              return <Tag>{tag}</Tag>
            })}
            <TagInput
            type="text"
            value={newTag}
            placeholder="태그를 입력해 주세요."
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if(e.keyCode == '13' || e.keyCode == '188'){
                e.preventDefault();
                setTags([...tags, newTag]);
                setNewTag('');
              }
            }}></TagInput>
          </Tags>
          <Description
            type="text"
            value={description}
            placeholder="글의 간략한 개요를 적어주세요."
            onChange={(e) => setDescription(e.target.value)}
          />
          <MDEditor _content={content} propsFunction={contentFunction}></MDEditor>
          <AddArticleButton
            onClick={async () => {
              let id = null;
               if(location.state.id == undefined){
                const { data } = await addArticle({
                  variables: {
                    title,
                    content,
                    description,
                  },
                });
                const article = data.createArticle;
                id = article.articleID;
                nav(`/article/${article.articleID}`);
               } else{
                id = Number(location.state.id);
                const { data } = await updateArticle({
                  variables: {
                    articleID: Number(location.state.id),
                    title: title,
                    content: content,
                    description: description,
                  },
                });
                const article = data.updateArticle;
                nav(`/article/${article.articleID}`);
               }
                // TODO: map does not work
                tags.map(async (tag) => {
                  const {data} = await addTag({
                    variables: {
                      articleID: id,
                      name: tag,
                    },
                  });
                });

            }}
          >
            {loading ? '등록중...' : '등록하기'}
          </AddArticleButton>
        </Editor>
        <Preview><h3>This is Preview Area!!</h3><br/>{MDXconverter(content)}</Preview>
      </Layout>
    </Main>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Editor = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Preview = styled.div`
  flex: 1;
  background-color: #eeeeee;
  padding : 10px 0 0 16px;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const AddArticleButton = styled.button`
  font-size: 1.5rem;
  height: 2.5rem;
  border: none;
  margin: 0 auto;
  background-color: #dcdcdc;
  &:hover {
    background-color: #e6e4e4;
  }
  
`;

const Description = styled.input`
  width: 90%;
  font-size: 1rem;
  margin-left: 6px;
  background-color: transparent;
  border-width: 0 0 0.5rem 0;
  border-style: solid;
  border-color: #dcdcdc;
  outline: none;

`;

const Title = styled.input`
  width: 90%;
  font-size: 2rem;
  margin-bottom: 3rem;
  margin-left: 6px;
  background-color: transparent;
  border-width: 0 0 0.5rem 0;
  border-style: solid;
  border-color: #dcdcdc;
  outline: none;
`;

const Content = styled.textarea`
  width: 90%;
  height: 30rem;
  font-size: 1rem;
  margin-left: 6px;
  background-color: transparent;
  outline: none;
`;

const TagInput = styled.input`
  min-width: 50px;
  height: 28px;
  line-height: 28px;
  font-size: 1rem;
  margin-bottom: 3rem;
  margin-left: 6px;
  background-color: transparent;
  border-width: 0 0 0 0;
  border-style: solid;
  outline: none;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  height: 28px;
  background-color: #66FF99;
  border-radius: 15px;
  border: 2px solid black;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 0px 10px;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
  &:hover{
    background-color: green;
  }
`;
