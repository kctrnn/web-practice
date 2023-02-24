import { TOKEN } from 'constants/index';
import { Route, RouteProps, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const isLoggedIn = Boolean(localStorage.getItem(TOKEN));

  return (
    <Route
      {...rest}
      render={() => (isLoggedIn ? children : <Redirect to='login' />)}
    />
  );
};
