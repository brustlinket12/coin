import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; 
import { supabase } from "../Services/supabase.js";  
import { Typography } from "@mui/material";

const MostrarUltimoIngreso = () => {
  const { user, loading } = useAuth(); 
  const [ultimoIngreso, setUltimoIngreso] = useState(null); 

  useEffect(() => {
    const fetchUltimoIngreso = async () => {
      try {
        if (user) {

          const { data, error } = await supabase
            .from("ingreso")
            .select("cantidad")
            .eq("uuid", user.id) 
            .order("creado_en", { ascending: false })
            .limit(1)
            .single();

          if (error) {
            console.error("Error al obtener último ingreso:", error.message);
            return;
          }

          setUltimoIngreso(data ? data.cantidad : 0); 
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    };

    if (!loading && user) {
      fetchUltimoIngreso();
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
      {ultimoIngreso !== null ? (
        <Typography variant="h5" style={{ fontWeight: "bold", color: "#5BF561" }}>
          Último Ingreso: ${ultimoIngreso}
        </Typography>
      ) : (
        <Typography variant="body1" style={{ color: "#FF0000" }}>
          No tienes ingresos registrados.
        </Typography>
      )}
    </div>
  );
};

export default MostrarUltimoIngreso;
