import { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';
import Notification from '../../Shared/Notification';
import NavLogin from './NavLogin';
import NavLogout from './NavLogout';
import profilePicture from '../../../img/profile.png';

const Header = () => {

  const [state, dispatch] = useContext(Context);
  
  useEffect(() => {
    if (state.isLoad || state.err || state.info) setTimeout(() => {
      dispatch({ type: 'info', payload: null }); dispatch({ type: 'err', payload: null })
    }, state.time);
  }, [state.isLoad, state.info, state.err]);

  return (
    <Fragment>
      <Notification type={state.isLoad ? 'l' : state.info ? 'i' : state.err ? 'e' : null} msg={state.info ? state.info : state.err ? state.err : null} />
      <nav className='navigation'>
        <div className='header-div'>
          <div className="header header-side header-div header-left">
            <Link to='/' className='header-item-img'><img src="/bird.png" alt="bird" /></Link>
            <Link to='/' className='header-item'>Home</Link>
          </div>
          <div className='header header-central'>
            <h1>Task</h1>
            <img src="/basketball.png" className="header-img" alt="flowers" />
            <h1>Manager</h1>
          </div>
          <div className="header header-side header-div header-right">
            {state.user
              ? <NavLogout />
              : <NavLogin />
            }
            <div className="image">
              {state.user ? state.photoUrl ?
                <Link to={`/auth/profile/${state.userId}`}><img src={state.photoUrl} alt="no picture" /></Link>
                : <Link to={`/auth/profile/${state.userId}`}><img src={profilePicture} alt="no picture" /></Link>
                : ''
              }
            </div>
          </div>
        </div>
      </nav>
      <style jsx>{`
      .navigation {
          width: 100%;
          min-height: 75px;
          background-color: #4b61a1;
          border-bottom: 2px solid #e29510;
          border-top: 2px solid #ffa000;
          display: flex;
          align-items: center;
      }
      .header-div{
          display: flex;
          align-items: center;
          height: 100%;
          flex-grow: 1;
      }
      .header-item {
        color: maroon;
        text-align: center;
        text-decoration: none;
        outline: none;
        margin: 0 30px;
        padding: 12px 15px;
        border-bottom: 3px solid maroon;
        border-radius: 50px;
        background-color: darkorange;
      }
      .header-item-img > img {
        width: 100%;
      }
      .header-item-img {
        width: 43px;
        margin: 0 30px;
      }
      .header-item:hover {
        cursor: pointer;
        border-bottom: none;
        border-top: 3px solid maroon;
        font-weight: bold;
      }
      .header-left {
        justify-content: flex-start;
      }
      .header-right {
        justify-content: flex-end;
      }
      .header-img {
        width: 50px;
        margin: 0 50px;
      }
      .header-central {
        display: flex;
        align-items: center;
        color: gold;
      }
      .image {
        width: 53px;
        display: flex;
        align-items: center;
        margin-right: 1.5rem;
      }
      img {
        width: 100%;
        border-radius: 50%;
      }
      @media (min-width: 989px) {
         .header-central {
           font-size: 2rem;
         }
      }
      @media (prefers-reduced-motion: no-preference) {
        .header-img {
          animation: App-logo-spin infinite 5s linear;
        }
      }
      @keyframes App-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      `}</style>
    </Fragment>
  );
};

export default Header;