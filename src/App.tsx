import React from 'react';
import { Routes, Route } from 'react-router-dom'

import WeatherPage from './pages/WeatherPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

import UserLayout from './layouts/UserLayout';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />}/>
          <Route path="weather" element={<WeatherPage />}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
