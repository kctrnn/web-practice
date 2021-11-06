import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

const Solution = () => {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={match.url} exact>
          <ListPage />
        </Route>

        <Route path={`${match.url}/:solutionId`}>
          <DetailPage />
        </Route>
      </Switch>
    </>
  );
};

export default Solution;
