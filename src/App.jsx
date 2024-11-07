import React from 'react';
import PaginaInicio from './Paginas/PaginaInicio'; // Asegúrate de que la ruta sea correcta
import PaginaTutorial from './Paginas/PaginaTutorial';
import PaginaInicioSesion from './Paginas/PaginaInicioSesion';
import PaginaInicioRegistrar from './Paginas/PaginaInicioRegistrar';
import PaginaDashboard from './Paginas/PaginaDashboard';

export default function App() {
  return (
    <div>
      <PaginaInicio/>
      {/* <PaginaTutorial/>
      <PaginaInicioSesion/>
      <PaginaInicioRegistrar/> 
      <PaginaDashboard/>
      */}
    </div>
  );
}

