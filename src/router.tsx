import { createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import Login, { GithubAuth } from './pages/Login';
import Post from './pages/Post';
import Article from './pages/Article';
import { client } from './apollo';
import { GITHUB_LOGIN, LOGIN } from './api/graphql';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/login/github',
    element: <GithubAuth />,
  },
  {
    path: '/post',
    element: <Post />,
  },
  {
    path: '/article/:id',
    element: <Article />,
  },
]);

export default router;
