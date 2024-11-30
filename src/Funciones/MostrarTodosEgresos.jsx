import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx"; // Asegúrate de que la ruta del contexto sea correcta
import { supabase } from "../Services/supabase.js";
import { Typography, Box, List, ListItem, ListItemText } from "@mui/material"; // Material UI para estilos

const MostrarTodosEgresos = () => {
  const { user, loading } = useAuth(); // Obtenemos el usuario desde el contexto
  const [egresos, setEgresos] = useState([]); // Guardamos todos los egresos

  useEffect(() => {
    const fetchEgresos = async () => {
      try {
        if (user) {
          // Consulta para obtener todos los egresos
          const { data, error } = await supabase
            .from("egreso") // Trabajamos con la tabla 'egreso'
            .select("id, cantidad, nombre, creado_en") // Seleccionamos los campos necesarios
            .eq("uuid", user.id) // Filtramos por el UUID del usuario autenticado
            .order("creado_en", { ascending: false }); // Ordenamos por fecha de creación descendente

          if (error) {
            console.error("Error al obtener egresos:", error.message);
            return;
          }

          // Actualizamos el estado con la lista de egresos obtenida
          setEgresos(data || []); // Si no hay datos, asignamos un array vacío
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    };

    // Llamamos a la función para obtener los egresos cuando el usuario esté autenticado
    if (!loading && user) {
      fetchEgresos();
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
      <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: "16px" }}>
        Todos tus Egresos
      </Typography>
      {egresos.length > 0 ? (
        <List>
          {egresos.map((egreso) => (
            <ListItem key={egreso.id} sx={{ borderBottom: "1px solid #ddd" }}>
              <ListItemText
                primary={`Nombre: ${egreso.nombre}`}
                secondary={
                  <>
                    <Typography variant="body2" component="span">
                      Cantidad: ${egreso.cantidad}
                    </Typography>
                    <br />
                    <Typography variant="body2" color="textSecondary">
                      Fecha: {new Date(egreso.creado_en).toLocaleDateString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" style={{ color: "#FF0000" }}>
          No tienes egresos registrados.
        </Typography>
      )}
    </div>
  );
};

export default MostrarTodosEgresos;
