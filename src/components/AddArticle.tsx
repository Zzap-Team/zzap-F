import { styled } from 'styled-components';

export function AddArticle() {
  return (
    <ArticleCardWrapper>
      <AddIcon>+</AddIcon>
    </ArticleCardWrapper>
  );
}

const AddIcon = styled.span`
  font-size: 20rem;
  caret-color: transparent;
  user-select: none;

  text-align: center;
`;

const ArticleCardWrapper = styled.div`
  width: 20rem;
  height: 25rem;
  border-radius: 4px;
  background-color: ${(props) => props.theme.bg2};
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
