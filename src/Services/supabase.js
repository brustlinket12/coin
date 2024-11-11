

// esto llama a la base de datos ( no tocar)
import { createClient } from '@supabase/supabase-js'
 export const supabase = createClient(
"https://caspdoizcunrxjzmmnvw.supabase.co" ,
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhc3Bkb2l6Y3Vucnhqem1tbnZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyNjQ1NjMsImV4cCI6MjA0Njg0MDU2M30.osbet8w0olBka4xrMZ8sDom5MlriFlwp8Hz3Wt4Exm8"

);

//funcion para meter datos
export async function insertData(table, data) {
    const { error } = await supabase.from(table).insert(data);
    return !error;
  }
  