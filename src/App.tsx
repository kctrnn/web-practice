import { Home, NotFound, PrivateRoute } from 'components/Common';
import Layout from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import RegisterPage from 'features/auth/pages/RegisterPage';
import Challenge from 'features/challenge';
import Dashboard from 'features/dashboard';
import Path from 'features/path';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Layout>
            <Home />
          </Layout>
        </Route>

        <Route path='/login'>
          <LoginPage />
        </Route>

        <Route path='/signup'>
          <RegisterPage />
        </Route>

        <PrivateRoute path='/dashboard'>
          <Layout>
            <Dashboard />
          </Layout>
        </PrivateRoute>

        <Route path='/paths'>
          <Path />
        </Route>

        <Route path='/challenges'>
          <Challenge />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
