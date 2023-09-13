import { gql } from '@apollo/client';

/*
  용도: 아티클 미리보기 목록 가져오기
  인자: 없음
  사용 페이지: 루트 페이지
*/
export const GET_ARTICLES = gql`
  query GetArticles {
    articles(limit: 20, cursor: 0) {
      articles {
        articleID
        title
        description
        createdAt
        author {
          name
        }
      }
    }
  }
`;

/*
  용도: 아티클 읽기
  인자: 아티클 아이디
  사용 페이지: 아티클 페이지
*/
export const GET_ARTICLE = gql`
  query GetArticle($id: Int!) {
    article(articleID: $id) {
      articleID
      title
      content
      description
      createdAt
      updatedAt
      author {
        name
      }
      tags{
        name
      }
    }
  }
`;

/*
  용도: 아티클 삭제
  인자: 아티클 아이디
  사용 페이지: 아티클  페이지
*/
export const DELETE_ARTICLE = gql`
mutation DeleteArticle($articleID: Int!){
  deleteArticle(articleID: $articleID)
}
`;

/*
  용도: 아티클 수정
  인자: 아티클 아이디, 제목, 내용, 설명
  사용 페이지: 아티클 페이지
*/
export const UPDATE_ARTICLE = gql`
mutation UpdateArticle($articleID: Int!, $title: String!, $content: String, $description: String){
  updateArticle(updateArticleDTO: { title: $title, content: $content, description: $description}, articleID: $articleID){
    articleID
  }
}
`;
/*
  용도: 아티클 작성
  인자: 제목, 내용, 설명
  사용 페이지: 아티클 작성 페이지
*/
export const ADD_ARTICLE = gql`
  mutation CreateArticle($title: String!, $content: String, $description: String) {
    createArticle(createArticleDTO: { title: $title, content: $content, description: $description }) {
      articleID
    }
  }
`;

/*
  용도: 아티클 작성
  인자: 제목, 내용, 설명
  사용 페이지: 아티클 작성 페이지
  비고: 쿠키로 refresh token(http only)
*/
export const GITHUB_LOGIN = gql`
  mutation GithubLogin($authCode: String!) {
    signinWithGithub(oauthSigninDTO: { code: $authCode }) {
      accessToken
      user {
        uid
        name
      }
    }
  }
`;

export const GET_ACCESSTOKEN = gql`
  mutation GetAccessToken {
    getAccessToken
  }
`;

/*
  용도: 로그 아웃
  인자: 없음(쿠키로 엑세스 토큰)
  사용 페이지: 로그아웃 버튼
  비고: 쿠키로 refresh token 지워 줌
*/
export const LOGOUT = gql`
  mutation Logout {
    signout
  }
`;

/*
  용도: 유저 정보
  인자: 쿠키로 엑세스 토큰
  사용 페이지: 
  비고: 쿠키로 refresh token 지워 줌
*/
export const GET_ME = gql`
  query GetMe {
    me {
      uid
      name
    }
  }
`;

/*
  용도: 태그로 아티클 찾기
  인자: 태그 이름
  사용 페이지: tags
*/
export const GET_TAG = gql`
 query getTag($name: String!){
  tag(name: $name){
    name
    articles{
      articleID
      title
      content
      createdAt
      description
      tags{
        name
      }
    }
  }
 }
`;

/*
  용도: 아티클에 태그 추가
  인자: id, tag이름
  사용 페이지: POST 페이지
  비고: 
*/
export const ADD_TAG = gql`
 mutation addTag($articleID: Int!, $name: String!){
  addTag(articleID: $articleID, name: $name){
    articleID
  }
 }
`;
