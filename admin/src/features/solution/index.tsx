import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';

function SolutionFeature() {
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

        <Route path={`${match.path}/:solutionId`}>
          <AddEditPage />
        </Route>
      </Switch>
    </div>
  );
}

export default SolutionFeature;
