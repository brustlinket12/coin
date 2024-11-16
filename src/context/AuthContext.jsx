import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../Services/supabase.js'; // Asegúrate de importar tu configuración de Supabase

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error obteniendo sesión:", error);
      } else {
        setUser(session ? session.user : null);
      }
      setLoading(false);
    };

    checkSession();

    // Suscripción a cambios en la sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? session.user : null);
    });

    // Limpia la suscripción al desmontar el componente
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
