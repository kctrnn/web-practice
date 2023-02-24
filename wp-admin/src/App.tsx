import cityApi from 'api/cityApi';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
  useEffect(() => {
    const fetchCityList = async () => {
      try {
        const response = await cityApi.getAll();
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCityList();
  }, []);

  return (
    <>
      <Switch>
        <Redirect exact from='/' to='/login' />

        <Route path='/login'>
          <LoginPage />
        </Route>

        <PrivateRoute path='/admin'>
          <AdminLayout />
        </PrivateRoute>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
