import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Asegúrate de que la ruta del contexto sea correcta
import { supabase } from "../Services/supabase.js";  // Ajusta la ruta al archivo supabase.js ""; // Ruta a la configuración de Supabase
import { Typography } from "@mui/material"; // Material UI para estilos

const MostrarUltimoIngreso = () => {
  const { user, loading } = useAuth(); // Obtenemos el usuario desde el contexto
  const [ultimoIngreso, setUltimoIngreso] = useState(null); // Guardamos el último ingreso

  useEffect(() => {
    const fetchUltimoIngreso = async () => {
      try {
        if (user) {
          // Consulta para obtener el último ingreso
          const { data, error } = await supabase
            .from("ingreso") // Trabajamos con la tabla 'ingreso'
            .select("cantidad")
            .eq("uuid", user.id) // Filtramos por el UUID del usuario autenticado
            .order("creado_en", { ascending: false }) // Ordenamos por fecha de creación descendente
            .limit(1) // Limitamos la consulta a 1 resultado
            .single(); // Usamos single() para obtener solo un único resultado

          if (error) {
            console.error("Error al obtener último ingreso:", error.message);
            return;
          }

          // Si obtenemos un resultado, actualizamos el estado
          setUltimoIngreso(data ? data.cantidad : 0); // Si no hay datos, asignamos 0
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    };

    // Llamamos a la función para obtener el último ingreso cuando el usuario está autenticado
    if (!loading && user) {
      fetchUltimoIngreso();
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
