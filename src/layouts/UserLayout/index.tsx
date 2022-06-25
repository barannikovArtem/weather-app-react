import React from 'react';
import { Link, Outlet } from 'react-router-dom';

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
    <>
      <header className="header">
        <Link to="/">Home</Link>
        <Link to="/weather">Weather</Link>
      </header>

      <Outlet />
      
      <footer className='footer'>
        <div className="footer__date">{dateBuilder(new Date())}</div>
      </footer>
    </>
  );
};

export default UserLayout;