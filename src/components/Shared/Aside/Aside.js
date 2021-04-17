import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';


const Aside = ({ labels, onAsideItemClick }) => {
    const [index, setIndex] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (
            !location.pathname.includes('/home') &&
            !location.pathname.includes('/tasks/add') &&
            !location.pathname.includes('/old-tasks') &&
            !location.pathname.includes('/about') &&
            !location.pathname.includes('/musical') &&
            !location.pathname.includes('/contact-us') &&
            !location.pathname.includes('/ala-bala')
        ) { setIndex(null) };
    },[index, location.pathname]);

    return (
        <aside className='aside'>
            {labels.map((x, i) =>
                <NavLink key={i} to={`/${x[0]}`} onClick={() => { onAsideItemClick(x[1]); setIndex(x => i); }}>
                    <div className={`aside-item`+`${index===i?' active':''}`}>{x[1]}</div>
                </NavLink>
            )}
            <style jsx>{`
            .aside{
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                margin: 1rem;
                max-height: 85vh;
            }
            .aside-item{
                width: 100px;
                border-left: 2px solid #4B61A1;
                border-right: 2px solid #4B61A1;
                margin: 11px auto;
                padding: 10px 0;
                border-radius: 50px;
                text-decoration: none;
                outline: none;
                background-color: aliceblue;
            }
            .aside-item:hover{
                border-left: none;
                border-right: none;
                font-weight: bold;
                border-top: 2px solid #4B61A1;
                border-bottom: 2px solid #4B61A1;
                color: #ffa000;
                background-color: antiquewhite;
            }
            .active {
                color: white;
                background-color: #4B61A1;
            }
            `}</style>
        </aside>
    )
};

export default Aside;