import { graphql } from 'msw';
import MOCK_ARTICLES from './mock_Articles.json';

export const handlers = [
  graphql.mutation('Login', (req, res, ctx) => {
    console.log('received request: ', req);

    return res(
      ctx.cookie('refreshtoken', 'mock_refreshtoken_1234', {
        httpOnly: true,
      }),
      ctx.data({
        signin: {
          accessToken: 'mock_accesstoken_1234',
          __typename: 'signin',
        },
      }),
    );
  }),
  graphql.mutation('GithubLogin', (req, res, ctx) => {
    return res(
      ctx.cookie('refreshtoken', 'mock_refreshtoken_1234', {
        httpOnly: true,
      }),
      ctx.data({
        signinWithGithub: {
          accessToken: 'mock_accesstoken_1234',
          __typename: 'signinWithGithub',
        },
      }),
    );
    console.log('received request: ', req);

    return res(
      ctx.data({
        signinWithGithub: {
          refreshToken: 'mock_hacho',
          accessToken: 'mock_testToken',
          __typename: 'GithubLogin',
        },
      }),
    );
  }),

  graphql.mutation('GetAccessToken', (req, res, ctx) => {
    const { refreshtoken } = req.cookies;
    if (refreshtoken !== 'mock_accesstoken_1234')
      return res(
        ctx.data({
          error: 'error',
          __typename: 'eerorr',
        }),
      );
    return res(
      ctx.data({
        signinWithGithub: {
          accessToken: 'mock_accesstoken_1234',
          __typename: 'signinWithGithub',
        },
      }),
    );
  }),

  graphql.query('GetArticles', (_, res, ctx) => {
    return res(
      ctx.data({
        articles: MOCK_ARTICLES,
        __typename: 'GetArticles',
      }),
    );
  }),

  graphql.query('GetArticle', (req, res, ctx) => {
    const article = MOCK_ARTICLES.find((article) => {
      return article.articleID == req.variables.id;
    });
    return res(
      ctx.data({
        article: {
          ...article,
          __typename: 'Article',
        },
      }),
    );
  }),
  graphql.mutation('CreateArticle', (req, res, ctx) => {
    const { refreshtoken } = req.cookies;
    if (refreshtoken !== 'mock_refreshtoken_1234')
      return res(
        ctx.data({
          error: 'error',
          __typename: 'eerorr',
        }),
      );
    const { title, content, description } = req.variables;

    return res(
      ctx.data({
        article: {
          articleID: 'newaritcle_' + title,
          title,
          content,
          description,
          createdAt: new Date().toUTCString(),
          __typename: 'AddArticle',
        },
      }),
    );
  }),
];
