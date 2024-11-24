import { Box, Button, TextField, Paper } from "@mui/material";
import logo4 from "../assets/img/Logo4.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Services/supabase.js";
 
function PaginaInicioSesion() {
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validación básica de campos
    if (!email || !password) {
      setError("Por favor, ingresa tanto el email como la contraseña.");
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      // Verifica si el usuario tiene datos en la tabla "monto"
      const { data: montoData, error: montoError } = await supabase
        .from("monto")
        .select("cantidad")
        .eq("uuid", data.user.id)
        .limit(1); // Aseguramos que solo se reciba un registro

      if (montoError) {
        setError(montoError.message);
        return;
      }

      // Verificar si el usuario tiene registros en la tabla "ingreso"
      const { data: ingresosData, error: ingresosError } = await supabase
        .from("ingreso")
        .select("id")
        .eq("uuid", data.user.id)
        .limit(1); // Verifica si existe al menos un ingreso

      if (ingresosError) {
        setError(ingresosError.message);
        return;
      }

      // Si no tiene registros ni en "monto" ni en "ingreso", lo redirige al tutorial
      if (!montoData || montoData.length === 0 || !ingresosData || ingresosData.length === 0) {
        // No hay datos en "monto" ni en "ingreso", redirige al tutorial
        navigate("/tutorial");
      } else {
        // Si tiene datos, redirige al dashboard
        navigate("/dashboard");
      }
      
    } catch (error) {
      setError("Hubo un error al intentar iniciar sesión.");
      console.error("Error en inicio de sesión:", error);
    }
  }
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

            {/* Campo para la contraseña */}
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

            {/* Muestra el error si existe */}
            {error && <div style={{ color: "red", marginBottom: "16px" }}>{error}</div>}

            {/* Botón de inicio de sesión */}
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
