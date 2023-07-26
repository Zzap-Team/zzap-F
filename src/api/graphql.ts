import { gql } from '@apollo/client';

export const GET_ARTICLES = gql`
  query getArticles {
    articles {
      articleID
      title
      content
      createdAt
      updatedAt
      author {
        uid
        name
        email
      }
    }
  }
`;

export const GET_ARTICLE = gql`
  query getArticle($id: String!) {
    article(articleID: $id) {
      articleID
      title
      content
      createdAt
      updatedAt
      author {
        uid
        name
        email
      }
    }
  }
`;

export const ADD_ARTICLE = gql`
  mutation CreateArticle($title: String!, $content: String) {
    createArticle(createArticleDTO: { title: $title, content: $content }) {
      articleID
      title
      content
      createdAt
      updatedAt
      author {
        uid
        name
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    signin(signInDTO: { email: $email, password: $password }) {
      accessToken
      refreshToken
    }
  }
`;

export const GITHUB_LOGIN = gql`
  mutation GithubLogin($authCode: String!) {
    signinWithGithub(oauthSigninDTO: { code: $authCode }) {
      statusCode
      message
      accessToken {
        token
        maxAge
      }
      refreshToken {
        token
        maxAge
      }
    }
  }
`;
