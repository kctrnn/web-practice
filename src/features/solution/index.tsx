import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NotFound } from 'components/Common';
import { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';
import SubmitPage from './pages/SubmitPage';
import {
  fetchSolutionList,
  selectSolutionFilter,
  selectSolutionList,
} from './solutionSlice';

const Solution = () => {
  const match = useRouteMatch();

  const solutionList = useAppSelector(selectSolutionList);
  const solutionFilter = useAppSelector(selectSolutionFilter);
  const dispatch = useAppDispatch();

  console.log(solutionList);

  useEffect(() => {
    dispatch(fetchSolutionList(solutionFilter));
  }, [dispatch, solutionFilter]);

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
