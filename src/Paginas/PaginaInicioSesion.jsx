import { Box, Button, TextField, Paper } from "@mui/material";
import logo4 from "../assets/img/Logo4.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { iniciarSesion } from "../Services/supabase.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { supabase } from "../Services/supabase.js";

function PaginaInicioSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      // Después de iniciar sesión, verifica si ya tiene datos en la base
      const { data: montoData, error: montoError } = await supabase
        .from("monto")
        .select("cantidad")
        .eq("uuid", data.user.id) // Usamos el UUID del usuario autenticado
        .single(); // Solo necesitamos un registro

      if (montoError) {
        setError(montoError.message);
        return;
      }

      // Si el usuario tiene datos en la tabla "monto", redirige a otro lugar
      if (montoData) {
        navigate("/dashboard"); // Cambia "/otro-lugar" por la ruta deseada
      } else {
        navigate("/monto"); // Si no tiene datos, lo redirigimos a la página de monto
      }
    } catch (error) {
      setError("Hubo un error al intentar iniciar sesión");
      console.error("Error en inicio de sesión:", error);
    }
  };


  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(6, 6, 34, 10)",
        overflow: "hidden",
        borderRadius: "16px",
      }}
    >
      <Box
        sx={{
          border: "0.10px solid white",
          borderRadius: "16px",
          display: "flex",
          alignItems: "flex-start",
          gap: "8px",
          backgroundColor: "transparent",
        }}
      >
        <Box>
          <Player
            autoplay
            loop
            src={logo4}
            style={{ height: "500px", width: "500px" }}
          />
        </Box>

        <Paper
          sx={{
            height: "auto",
            width: "400px",
            padding: "0.1px",
            backgroundColor: "transparent",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <h1 style={{ color: "white" }}>Iniciar Sesión</h1>
            <h3 style={{ color: "white" }}>Bienvenido a Coin Guard</h3>

            {/* Campo para el email */}
            <TextField
              variant="standard"
              label="Usuario"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiInput-underline:after": { borderBottomColor: "black" },
                backgroundColor: "transparent",
                marginBottom: "36px",
              }}
            />

          
            <TextField
              variant="standard"
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiInput-underline:after": { borderBottomColor: "black" },
                backgroundColor: "transparent",
                marginBottom: "36px",
              }}
            />

           
            {error && <div style={{ color: "red", marginBottom: "16px" }}>{error}</div>}

        
            <Button
              variant="contained"
              size="small"
              style={{
                padding: "10px 20px",
                marginTop: "36px",
                borderRadius: "20px",
                backgroundColor: "rgba(8, 28, 53, 1)",
                boxShadow: "0px 4px 10px 0px rgba(255, 255, 255, 0.1)",
              }}
              onClick={handleLogin}  
            >
              Iniciar sesión
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default PaginaInicioSesion;