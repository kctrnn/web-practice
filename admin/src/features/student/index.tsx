import { fetchCityList } from "features/city/citySlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddEditPage from "./pages/AddEditPage";
import MainPage from "./pages/MainPage";

function Student() {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCityList());
  }, [dispatch]);

  return (
    <div>
      <Switch>
        <Route exact path={match.path}>
          <MainPage />
        </Route>

        <Route path={`${match.path}/add`}>
          <AddEditPage />
        </Route>

        <Route path={`${match.path}/:studentId`}>
          <AddEditPage />
        </Route>
      </Switch>
    </div>
  );
}

export default Student;
