import { Route, RouterProvider } from 'react-router-dom';
import router from './router';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // const loggedIn = window.localStorage.getItem('LOGGED_IN');
    // if (loggedIn) {
    // }
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
