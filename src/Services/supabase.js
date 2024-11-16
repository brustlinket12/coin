

// esto llama a la base de datos ( no tocar)
import { createClient } from '@supabase/supabase-js'
 export const supabase = createClient(
"https://caspdoizcunrxjzmmnvw.supabase.co" ,
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhc3Bkb2l6Y3Vucnhqem1tbnZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyNjQ1NjMsImV4cCI6MjA0Njg0MDU2M30.osbet8w0olBka4xrMZ8sDom5MlriFlwp8Hz3Wt4Exm8"

);

//funcion para ingresar usuarios nuevos uwu
export const registrarUsuario = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { user: data.user };
};


// funcion para iniciar sesion uwu
export const iniciarSesion = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message }; 
    }

    return { data }; 
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return { error: 'Hubo un problema al intentar iniciar sesión. Intenta nuevamente.' };
  }
};