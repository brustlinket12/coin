import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaInicio from './Paginas/PaginaInicio'; // Página de inicio
import PaginaTutorial from './Paginas/PaginaMonto'; // Página de tutorial
import PaginaInicioSesion from './Paginas/PaginaInicioSesion'; // Página de inicio de sesión
import PaginaInicioRegistrar from './Paginas/PaginaInicioRegistrar'; // Página de registro
import PaginaDashboard from './Paginas/PaginaDashboard'; // Página del dashboard
import PaginaMonto from './Paginas/PaginaMonto';
import PaginaTransicion from './Paginas/paginatransicion';
import PaginaIngresos from './Paginas/PaginaIngresos';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta inicial (por defecto) */}
          <Route path="/" element={<PaginaInicio />} /> {/* Página de inicio como página por defecto */}

          {/* Otras rutas */}
          <Route path="/tutorial" element={<PaginaTutorial />} />
          <Route path="/inicio-sesion" element={<PaginaInicioSesion />} />
          <Route path="/registrar" element={<PaginaInicioRegistrar />} />
          <Route path="/dashboard" element={<PaginaDashboard />} />
          <Route path="/monto" element={<PaginaMonto />} />
          <Route path="/transicion" element={<PaginaTransicion />} />
          <Route path="/ingresos" element={<PaginaIngresos />} />
          {/* Agrega más rutas si es necesario */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
