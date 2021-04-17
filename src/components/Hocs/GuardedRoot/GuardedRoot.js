import { Redirect, Route } from "react-router";

const GuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (auth === true ? <Component {...props} /> : <Redirect to='/auth/login' />)} />
);
export default GuardedRoute;