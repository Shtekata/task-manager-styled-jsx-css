import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NavLogin = () => (
    <Fragment>
        <Link to='/auth/login' className='header-item'>Login</Link>
        <Link to='/auth/register' className='header-item'>Register</Link>
    </Fragment>
);
export default NavLogin;