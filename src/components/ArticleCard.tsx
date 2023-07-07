import { styled } from 'styled-components';

type ArticleCardProps = {
  title: string;
  description: string;
  author: string;
  createdAt: string;
};

export function ArticleCard({ title, description, author, createdAt }: ArticleCardProps) {
  return (
    <ArticleCardWrapper>
      <Title>{title}</Title>
      <Description>{description}...</Description>
      <Author>{`by ${author}`}</Author>
      <CreatedAt>{createdAt}</CreatedAt>
    </ArticleCardWrapper>
  );
}

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

const Title = styled.h4`
  text-align: center;
`;

const Description = styled.p`
  text-align: center;
`;

const Author = styled.p`
  text-align: center;
`;

const CreatedAt = styled.p`
  text-align: center;
`;
