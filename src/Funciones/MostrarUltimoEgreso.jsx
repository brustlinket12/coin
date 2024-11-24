import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Asegúrate de que la ruta del contexto sea correcta
import { supabase } from "../Services/supabase.js";
import { Typography } from "@mui/material"; // Material UI para estilos

const MostrarUltimoEgreso = () => {
  const { user, loading } = useAuth(); // Obtenemos el usuario desde el contexto
  const [ultimoEgreso, setUltimoEgreso] = useState(null); // Guardamos el último egreso

  useEffect(() => {
    const fetchUltimoEgreso = async () => {
      try {
        if (user) {
          // Consulta para obtener el último egreso
          const { data, error } = await supabase
            .from("egreso") // Trabajamos con la tabla 'egreso'
            .select("cantidad")
            .eq("uuid", user.id) // Filtramos por el UUID del usuario autenticado
            .order("creado_en", { ascending: false }) // Ordenamos por fecha de creación descendente
            .limit(1) // Limitamos la consulta a 1 resultado
            .single(); // Usamos single() para obtener solo un único resultado

          if (error) {
            console.error("Error al obtener último egreso:", error.message);
            return;
          }

          // Si obtenemos un resultado, actualizamos el estado
          setUltimoEgreso(data ? data.cantidad : 0); // Si no hay datos, asignamos 0
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    };

    // Llamamos a la función para obtener el último egreso cuando el usuario está autenticado
    if (!loading && user) {
      fetchUltimoEgreso();
    }
  }, [user, loading]); // Dependencia en el usuario y el estado de carga

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
