import { NotFound } from 'components/Common';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';
import SubmitPage from './pages/SubmitPage';

const Solution = () => {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={match.url} exact>
          <ListPage />
        </Route>

        <Route path={`${match.url}/:solutionId`} exact>
          <DetailPage />
        </Route>

        <Route path={`${match.url}/:solutionId/submit`}>
          <SubmitPage />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default Solution;
