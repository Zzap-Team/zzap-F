import { createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import Login, { GithubAuth } from './pages/Login';
import Post from './pages/Post';
import Article from './pages/Article';
import { ProtectRoute } from './components/Utils';
import { store } from './apollo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/login/github',
    element: (
      <ProtectRoute when={store.user().loggedIn === true} to="/">
        <GithubAuth />
      </ProtectRoute>
    ),
  },
  {
    path: '/post',
    element: (
      <ProtectRoute when={store.user().loggedIn === false} to="/login/github">
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
