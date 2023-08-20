import { Route, RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  // const [getAccessToken] = useMutation(GET_ACCESSTOKEN);

  return <RouterProvider router={router} />;
}

export default App;
