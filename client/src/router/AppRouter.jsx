import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MenuPage } from '../pages/MenuPage';

export const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MenuPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
