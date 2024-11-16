import React from 'react';
import PaginaInicio from './Paginas/PaginaInicio'; 
import PaginaTutorial from './Paginas/PaginaMonto';
import PaginaInicioSesion from './Paginas/PaginaInicioSesion';
import PaginaInicioRegistrar from './Paginas/PaginaInicioRegistrar';
import PaginaDashboard from './Paginas/PaginaDashboard';

export default function App() {
  return (
    <div>
      <PaginaInicioRegistrar/>
      {/* <PaginaTutorial/>
      <PaginaInicioSesion/>
      <PaginaInicioRegistrar/> 
      <PaginaDashboard/>
      */}
    </div>
  );
}

