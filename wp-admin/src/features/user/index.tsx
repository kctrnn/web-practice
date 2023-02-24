import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';

function UserFeature() {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={match.path}>
          <ListPage />
        </Route>

        <Route path={`${match.path}/add`}>
          <AddEditPage />
        </Route>

        <Route path={`${match.path}/:userId`}>
          <AddEditPage />
        </Route>
      </Switch>
    </div>
  );
}

export default UserFeature;
