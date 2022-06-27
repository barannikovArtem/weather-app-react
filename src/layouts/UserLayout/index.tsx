import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import './index.scss';

const dateBuilder = (d: Date) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month}, ${year}`
}

const UserLayout = () => {
  return (
    <div className='app'>
      <header className="header">
        <div className="header__navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/weather">Weather</NavLink>
        </div>
      </header>

      <Outlet />
      
      <footer className='footer'>
        <div className="footer__date">{dateBuilder(new Date())}</div>
      </footer>
    </div>
  );
};

export default UserLayout;