import React, { useEffect } from 'react';
import { Box } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado
import chek from "../assets/img/chek.json"; // Verifica la ruta

function PaginaTransicion() {
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    // Redirigir después de 9 segundos
    const timer = setTimeout(() => {
      navigate("/inicio-sesion"); // Cambia la ruta de destino aquí
    }, 6000); // 9 segundos

    // Limpiar el temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        height: "100vh", // Asegura que ocupe toda la altura de la pantalla
        width: "100%", // Asegura que ocupe todo el ancho de la pantalla
        backgroundColor:"rgba(6, 6, 34, 10)", // Fondo para el Box
        position: "absolute", // Asegura que el Box ocupe toda la pantalla
        top: 0,
        left: 0
      }}
    >
      <Player
        autoplay
        loop
        src={chek}
        style={{
          height: "500px", // Ajusta el tamaño según tus necesidades
          width: "500px",  // Ajusta el tamaño según tus necesidades
        }}
      />
    </Box>
  );
}

export default PaginaTransicion;
