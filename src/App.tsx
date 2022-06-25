import React from 'react';
import { Routes, Route } from 'react-router-dom'

import WeatherPage from './pages/WeatherPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

import UresLayout from './layouts/UserLayout';

const App: React.FC = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<UresLayout />}>
          <Route index element={<HomePage />}/>
          <Route path="weather" element={<WeatherPage />}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
