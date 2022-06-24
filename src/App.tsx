import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import classNames from 'classnames';

import WeatherPage from './pages/WeatherPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';

const App: React.FC = () => {

  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/weather" element={<WeatherPage />}/>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </div>
  );
}

export default App;
