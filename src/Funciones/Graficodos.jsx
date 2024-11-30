import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts'; 
import { supabase } from "../Services/supabase.js"; 

const Graficodos = ({ user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEgresos = async () => {
      try {
        if (user) {
          const { data, error } = await supabase
            .from("egreso")
            .select("cantidad, creado_en")
            .eq("uuid", user.id)
            .order("creado_en", { ascending: true });

          if (error) throw error;

          console.log("Datos obtenidos:", data); 

          if (data.length > 0) {
            const formattedData = data.map(item => ({
              date: new Date(item.creado_en).toLocaleDateString(),
              amount: item.cantidad,
            }));

            setData(formattedData);
          } else {
            console.warn("No se encontraron egresos.");
          }
        }
      } catch (error) {
        console.error("Error al obtener los egresos:", error);
        setError("Ocurrió un problema al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchEgresos();
  }, [user]);

  return (
    <div style={{ width: '100%', height: 400 }}>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#FF5733" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Graficodos;
