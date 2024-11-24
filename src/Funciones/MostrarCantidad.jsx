import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Asegúrate de que la ruta del contexto sea correcta
import { supabase } from "../Services/supabase.js"; // Ajusta la ruta al archivo supabase.js
import { Typography } from "@mui/material"; // Usamos Material-UI para los estilos

const MostrarCantidad = () => {
  const { user, loading } = useAuth(); // Obtenemos el usuario desde el contexto
  const [cantidad, setCantidad] = useState(null); // Guardamos la cantidad obtenida

  useEffect(() => {
    const fetchCantidad = async () => {
      try {
        if (user) {
          // Realizamos la consulta a la tabla 'monto' para obtener la 'cantidad'
          const { data, error } = await supabase
            .from("monto")
            .select("cantidad")
            .eq("uuid", user.id) // Filtramos por el UUID del usuario autenticado
            .single(); // Usamos single() si esperamos solo un resultado

          if (error) {
            console.error("Error al obtener monto:", error.message);
            return;
          }

          // Si obtenemos datos, actualizamos el estado
          setCantidad(data ? data.cantidad : 0); // Si no hay datos, asignamos 0
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    };

    // Llamamos a la función para obtener la cantidad cuando el usuario está autenticado
    if (!loading && user) {
      fetchCantidad();
    }
  }, [user, loading]); // Dependencia en user y loading para volver a ejecutar la consulta si el usuario cambia

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
