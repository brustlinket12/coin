import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx"; 
import { supabase } from "../Services/supabase.js";
import { Typography, Box, List, ListItem, ListItemText } from "@mui/material"; 

const MostrarTodosEgresos = () => {
  const { user, loading } = useAuth(); 
  const [egresos, setEgresos] = useState([]); 

  useEffect(() => {
    const fetchEgresos = async () => {
      try {
        if (user) {

          const { data, error } = await supabase
            .from("egreso") 
            .select("id, cantidad, nombre, creado_en")
            .eq("uuid", user.id) 
            .order("creado_en", { ascending: false });

          if (error) {
            console.error("Error al obtener egresos:", error.message);
            return;
          }

          setEgresos(data || []); 
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    };

    if (!loading && user) {
      fetchEgresos();
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
