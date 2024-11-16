import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaInicio from './Paginas/PaginaInicio'; // Página de inicio
import PaginaTutorial from './Paginas/PaginaMonto'; // Página de tutorial
import PaginaInicioSesion from './Paginas/PaginaInicioSesion'; // Página de inicio de sesión
import PaginaInicioRegistrar from './Paginas/PaginaInicioRegistrar'; // Página de registro
import PaginaDashboard from './Paginas/PaginaDashboard'; // Página del dashboard

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta inicial (por defecto) */}
        <Route path="/" element={<PaginaInicio />} /> {/* Página de inicio como página por defecto */}

        {/* Otras rutas */}
        <Route path="/tutorial" element={<PaginaTutorial />} />
        <Route path="/inicio-sesion" element={<PaginaInicioSesion />} />
        <Route path="/registrar" element={<PaginaInicioRegistrar />} />
        <Route path="/dashboard" element={<PaginaDashboard />} />
        {/* Agrega más rutas si es necesario */}
      </Routes>
    </Router>
  );
}

export default App;
