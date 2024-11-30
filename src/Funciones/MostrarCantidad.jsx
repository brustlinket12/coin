import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; 
import { supabase } from "../Services/supabase.js";
import { Typography } from "@mui/material"; 

const MostrarCantidad = () => {
  const { user, loading } = useAuth(); 
  const [cantidad, setCantidad] = useState(null);

  useEffect(() => {
    const fetchCantidad = async () => {
      try {
        if (user) {

          const { data, error } = await supabase
            .from("monto")
            .select("cantidad")
            .eq("uuid", user.id) 
            .single(); 

          if (error) {
            console.error("Error al obtener monto:", error.message);
            return;
          }

          
          setCantidad(data ? data.cantidad : 0); 
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    };

    if (!loading && user) {
      fetchCantidad();
    }
  }, [user, loading]); 

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <p>No estás autenticado. Por favor, inicia sesión.</p>;
  }

  return (
    <div>
      {cantidad !== null ? (
        <Typography variant="h4" style={{ fontWeight: "bold", color: "#5BF561" }}>
          Monto Actual: ${cantidad}
        </Typography>
      ) : (
        <Typography variant="body1" style={{ color: "#FF0000" }}>
          No tienes monto registrado.
        </Typography>
      )}
    </div>
  );
};

export default MostrarCantidad;
