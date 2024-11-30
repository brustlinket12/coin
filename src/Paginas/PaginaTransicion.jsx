import React, { useEffect } from 'react';
import { Box } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from 'react-router-dom'; 
import chek from "../assets/img/chek.json"; 

function PaginaTransicion() {
  const navigate = useNavigate(); 

  useEffect(() => {

    // Redirigir después de 9 segundos
    const timer = setTimeout(() => {
      navigate("/inicio-sesion"); 
    }, 6000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        height: "100vh", 
        width: "100%", 
        backgroundColor:"rgba(6, 6, 34, 10)", 
        position: "absolute", 
        top: 0,
        left: 0
      }}
    >
      <Player
        autoplay
        loop
        src={chek}
        style={{
          height: "500px", 
          width: "500px",  
        }}
      />
    </Box>
  );
}

export default PaginaTransicion;
