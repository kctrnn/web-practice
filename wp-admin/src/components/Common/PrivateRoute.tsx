import { RouteProps, Route, Redirect } from "react-router-dom";

export function PrivateRoute({ children, ...rest }: RouteProps) {
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));

  return (
    <Route
      {...rest}
      render={() => (isLoggedIn ? children : <Redirect to='/login' />)}
    />
  );
}
