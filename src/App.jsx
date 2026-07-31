import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Cadastro from './Pages/Cadastro/Cadastro'
import Login from './Pages/Login/Login'
import Menu from './Pages/MenuUser/MenuUser';
import Downloadwall from './Pages/Download/DownloadWall';
export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/Download/:slug" element={<Downloadwall />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Menu />} />
      
      </Routes>
    </BrowserRouter>
  );
}