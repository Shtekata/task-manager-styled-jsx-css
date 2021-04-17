import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NavLogin = () => (
    <Fragment>
        <Link to='/auth/login'><div className='header-item'>Login</div></Link>
        <Link to='/auth/register'><div className='header-item'>Register</div></Link>
    </Fragment>
);
export default NavLogin;