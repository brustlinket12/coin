import React, { useState, useEffect } from "react";
import { supabase } from "../Services/supabase.js";

const Tareasdash = () => {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTareas = async () => {
    setLoading(true);
    setError(null);
  
    try {
      // Obtiene el usuario autenticado
      const { data: { user }, error: userError } = await supabase.auth.getUser();
  
      if (userError) {
        throw new Error("No se pudo obtener el usuario autenticado.");
      }
  
      if (!user || !user.id) {
        throw new Error("Usuario no autenticado.");
      }
  
      // Consulta las tareas con un límite de 5
      const { data, error } = await supabase
        .from("tareas")
        .select("titulo, monto")
        .eq("uuid", user.id) 
        .limit(5);
  
      if (error) {
        throw error;
      }
  
      setTareas(data); 
    } catch (error) {
      console.error("Error al obtener las tareas:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchTareas();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#1C2333",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        color: "#fff",
        textAlign: "center",
      }}
    >
     
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tareas.map((tarea, index) => (
            <li key={index} style={{ margin: "8px 0" }}>
              <strong>{tarea.titulo}</strong> - {tarea.fecha} - ${tarea.monto}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tareasdash;
