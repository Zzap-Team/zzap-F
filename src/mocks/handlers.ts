import { graphql } from 'msw';

export const handlers = [
  graphql.mutation('Login', (req, res, ctx) => {
    console.log('received request: ', req);

    return res(
      ctx.data({
        signin: {
          refreshToken: 'mock_hacho',
          accessToken: 'mock_testToken',
          __typename: 'Login',
        },
      }),
    );
  }),
  graphql.mutation('GithubLogin', (req, res, ctx) => {
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

  graphql.query('getArticles', (req, res, ctx) => {
    return res(
      ctx.data({
        articles: [
          {
            articleID: '123',
            title: 'hello',
            content: 'ewr',
            createdAt: '12345datae',
            __typename: 'GetArticles',
          },
        ],
      }),
    );
  }),
  graphql.query('getArticle', (req, res, ctx) => {
    return res(
      ctx.data({
        article: {
          articleID: req.variables.id,
          title: 'hello',
          content: 'ewr',
          createdAt: '12345datae',
          __typename: 'GetArticles',
        },
      }),
    );
  }),
  graphql.mutation('AddArticle', (req, res, ctx) => {
    return res(
      ctx.data({
        article: {
          articleID: 'addarticle',
          title: 'hello',
          content: 'ewr',
          createdAt: '12345datae',
          __typename: 'AddArticle',
        },
      }),
    );
  }),
];
