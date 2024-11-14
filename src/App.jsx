import React from 'react';
import PaginaInicio from './Paginas/PaginaInicio'; // Asegúrate de que la ruta sea correcta
import PaginaTutorial from './Paginas/PaginaMonto';
import PaginaInicioSesion from './Paginas/PaginaInicioSesion';
import PaginaInicioRegistrar from './Paginas/PaginaInicioRegistrar';
import PaginaDashboard from './Paginas/PaginaDashboard';
import Recordatorios from './Paginas/Recordatorios';
export default function App() {
  return (
    <div>
      {/*<PaginaInicioRegistrar/>
      <PaginaTutorial/>
      <PaginaInicioSesion/>
      <PaginaInicioRegistrar/> */}
      {/*<PaginaDashboard/>*/}
      <Recordatorios/>
    </div>
  );
}

