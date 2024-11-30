import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts';
import { supabase } from "../Services/supabase.js"; 
import { useAuth } from "../context/AuthContext"; 

const Grafico = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useAuth(); 
  
  // Función para obtener los datos de egreso de la base de datos
  const fetchEgresoData = async () => {
    if (!user) {
      setErrorMessage('No user found.');
      return;
    }
    
    setLoading(true);
    setErrorMessage(null); 
    
    try {

      const { data: egresoData, error } = await supabase
        .from('egreso')
        .select('cantidad, creado_en')
        .eq('uuid', user.id); 

      if (error) throw error;

      // Verificar si los datos son en el formato correcto
      if (egresoData && Array.isArray(egresoData)) {
        //convierte al formato correcto
        const formattedData = egresoData.map(item => ({
          name: new Date(item.creado_en).toLocaleDateString(), 
          value: item.cantidad, 
        }));

        setData(formattedData); 
      } else {
        setErrorMessage('No data found.');
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

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
