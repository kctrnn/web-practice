import { NotFound, PrivateRoute } from 'components/Common';
import { GeneralLayout, Home, SevenStep } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import RegisterPage from 'features/auth/pages/RegisterPage';
import Challenge from 'features/challenge';
import Dashboard from 'features/dashboard';
import Forum from 'features/forum';
import Path from 'features/path';
import Solution from 'features/solution';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <GeneralLayout>
            <Home />
          </GeneralLayout>
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/register">
          <RegisterPage />
        </Route>

        <PrivateRoute path="/dashboard">
          <GeneralLayout>
            <Dashboard />
          </GeneralLayout>
        </PrivateRoute>

        <Route path="/paths/:pathSlug">
          <GeneralLayout>
            <Path />
          </GeneralLayout>
        </Route>

        <Route path="/challenges/:challengeId">
          <GeneralLayout>
            <Challenge />
          </GeneralLayout>
        </Route>

        <Route path="/solutions">
          <GeneralLayout>
            <Solution />
          </GeneralLayout>
        </Route>

        <Route path="/forum">
          <GeneralLayout>
            <Forum />
          </GeneralLayout>
        </Route>

        <Route path="/seven-step">
          <GeneralLayout>
            <SevenStep />
          </GeneralLayout>
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
