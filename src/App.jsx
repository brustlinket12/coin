import React from 'react';
import PaginaInicio from './Paginas/PaginaInicio'; 
import PaginaTutorial from './Paginas/PaginaMonto';
import PaginaInicioSesion from './Paginas/PaginaInicioSesion';
import PaginaInicioRegistrar from './Paginas/PaginaInicioRegistrar';
import PaginaDashboard from './Paginas/PaginaDashboard';
import PaginaMonto from './Paginas/PaginaMonto';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
    <Routes>
  
      <Route path="/" element={<PaginaInicio />} /> 
      
      
      <Route path="/monto" element={<PaginaMonto />} /> {/* Página de tutorial */}
      <Route path="/inicioSesion" element={<PaginaInicioSesion />} /> {/* Página de inicio de sesión */}
      <Route path="/registrar" element={<PaginaInicioRegistrar />} /> {/* Página de registro */}
      <Route path="/dashboard" element={<PaginaDashboard />} /> {/* Página de dashboard */}
    </Routes>
  </Router>
);
}

