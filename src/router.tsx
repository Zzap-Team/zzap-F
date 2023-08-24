import { createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import Login, { GithubAuth } from './pages/Login';
import Post from './pages/Post';
import Article from './pages/Article';
import { ProtectRoute } from './components/Utils';
import { user } from './apollo/store';

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
      <ProtectRoute when={() => user().loggedIn === false} to="/">
        <Post />
      </ProtectRoute>
    ),
  },
  {
    path: '/article/:id',
    element: <Article />,
  },
]);

export default router;
