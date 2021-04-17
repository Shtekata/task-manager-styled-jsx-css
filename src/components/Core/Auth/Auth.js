import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile/Profile";
import Register from "./Register";

const Auth = () => (
    <Switch>
        <Route path='/auth/login'><Login /></Route>
        <Route path='/auth/register'><Register /></Route>
        <Route path='/auth/profile/:_id'><Profile /></Route>
    </Switch>
);
export default Auth;