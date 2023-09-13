import { createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import Login, { GithubAuth } from './pages/Login';
import Post from './pages/Post';
import Article from './pages/Article';
import { ProtectRoute } from './components/Utils';
import Dev from './dev';
import Tagged from './pages/Tagged';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/login/github',
    element: <GithubAuth />,
  },
  {
    path: '/post',
    element: (
      <ProtectRoute when={false} to="/login/github">
        <Post />
      </ProtectRoute>
    ),
  },
  {
    path: '/post/:id',
    element: (
      <ProtectRoute when={false} to="/login/github">
        <Post />
      </ProtectRoute>
    ),
  },
  {
    path: '/article/:id',
    element: <Article />,
  },
  {
    path: '/tag/:name',
    element: <Tagged />,
  },
  {
    path: '/dev',
    element: <Dev></Dev>,
  },
]);

export default router;
