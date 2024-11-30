import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaInicio from './Paginas/PaginaInicio'; // Página de inicio// Página de tutorial
import PaginaInicioSesion from './Paginas/PaginaInicioSesion'; // Página de inicio de sesión
import PaginaInicioRegistrar from './Paginas/PaginaInicioRegistrar'; // Página de registro
import PaginaDashboard from './Paginas/PaginaDashboard'; // Página del dashboard
import PaginaMonto from './Paginas/PaginaMonto';
import PaginaTransicion from './Paginas/PaginaTransicion';
import PaginaIngresos from './Paginas/PaginaIngresos';
import PaginaEgresos from './Paginas/PaginaEgresos';
import Paginarecordatorios from './Paginas/Paginarecordatorios';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* pagina default el landing */}
          <Route path="/" element={<PaginaInicio />} />

          {/* Otras rutas */}
          <Route path="/tutorial" element={<PaginaMonto />} />
          <Route path="/inicio-sesion" element={<PaginaInicioSesion />} />
          <Route path="/registrar" element={<PaginaInicioRegistrar />} />
          <Route path="/dashboard" element={<PaginaDashboard />} />
          <Route path="/monto" element={<PaginaMonto />} />
          <Route path="/transicion" element={<PaginaTransicion />} />
          <Route path="/ingresos" element={<PaginaIngresos />} />
          <Route path="/egresos" element={<PaginaEgresos />} />
          <Route path="/recordatorios" element={<Paginarecordatorios />} />
          {/* Agrega más rutas si es necesario */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
