import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditPage from './page/AddEditPage';
import ListPage from './page/ListPage';

function ChallengeFeature() {
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

        <Route path={`${match.path}/:challengeId`}>
          <AddEditPage />
        </Route>
      </Switch>
    </div>
  );
}

export default ChallengeFeature;
