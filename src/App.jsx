import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Login, Register, Activate, ForgotPassword, ResetPassword } from './pages';
import Toast from './components/common/Toast';

const App = () => {
  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate" element={<Activate />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
