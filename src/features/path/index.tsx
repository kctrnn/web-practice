import { useAppDispatch } from 'app/hooks';
import { NotFound } from 'components/Common';
import { fetchChallengeList } from 'features/challenge/challengeSlice';
import { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MainPage from './pages/MainPage';

function Path() {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChallengeList());
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route exact path={match.path}>
          <NotFound />
        </Route>

        <Route path={`${match.path}/:pathSlug`}>
          <MainPage />
        </Route>
      </Switch>
    </>
  );
}
export default Path;
