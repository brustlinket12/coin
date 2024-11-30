import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../Services/supabase.js";
import { Typography } from "@mui/material"; 

const MostrarUltimoEgreso = () => {
  const { user, loading } = useAuth(); 
  const [ultimoEgreso, setUltimoEgreso] = useState(null); 

  useEffect(() => {
    const fetchUltimoEgreso = async () => {
      try {
        if (user) {

          const { data, error } = await supabase
            .from("egreso")
            .select("cantidad")
            .eq("uuid", user.id) 
            .order("creado_en", { ascending: false })
            .limit(1)
            .single();

          if (error) {
            console.error("Error al obtener último egreso:", error.message);
            return;
          }

          setUltimoEgreso(data ? data.cantidad : 0);
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    };

    if (!loading && user) {
      fetchUltimoEgreso();
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
      {ultimoEgreso !== null ? (
        <Typography variant="h5" style={{ fontWeight: "bold", color: "#FF5555" }}>
          Último Egreso: ${ultimoEgreso}
        </Typography>
      ) : (
        <Typography variant="body1" style={{ color: "#FF0000" }}>
          No tienes egresos registrados.
        </Typography>
      )}
    </div>
  );
};

export default MostrarUltimoEgreso;
