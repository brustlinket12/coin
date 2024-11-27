import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts';
import { supabase } from "../Services/supabase.js"; // Ajusta la ruta al archivo supabase.js
import { useAuth } from "../context/AuthContext"; // Asegúrate de que la ruta del contexto sea correcta

const Grafico = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useAuth(); // Usamos el hook de autenticación para obtener el usuario actual
  
  // Función para obtener los datos de egreso de la base de datos
  const fetchEgresoData = async () => {
    if (!user) {
      setErrorMessage('No user found.');
      return;
    }
    
    setLoading(true);
    setErrorMessage(null); // Reset error message before each request
    
    try {
      // Obtén los datos de egreso filtrados por el UUID del usuario
      const { data: egresoData, error } = await supabase
        .from('egreso')
        .select('cantidad, creado_en')
        .eq('uuid', user.id); // Asumiendo que el campo uuid es 'id' para el usuario

      if (error) throw error;

      // Verifica si los datos están en el formato correcto
      if (egresoData && Array.isArray(egresoData)) {
        // Procesa los datos para convertirlos en el formato adecuado para el gráfico
        const formattedData = egresoData.map(item => ({
          name: new Date(item.creado_en).toLocaleDateString(), // Formato de fecha en 'name'
          value: item.cantidad, // Valor de 'cantidad' en 'value'
        }));

        setData(formattedData); // Guarda los datos en el estado
      } else {
        setErrorMessage('No data found.');
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Llama a la función de obtener datos cuando el componente se monte o cuando 'user' cambie
  useEffect(() => {
    fetchEgresoData();
  }, [user]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      <h3>Gráfico de Egresos</h3>
      <LineChart
        data={data}
        xField="name"
        yField="value"
        title="Egresos por Fecha"
        height={300}
      />
    </div>
  );
};

export default Grafico;
