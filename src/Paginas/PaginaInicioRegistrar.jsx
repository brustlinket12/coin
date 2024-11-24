import { Box, Button, TextField, Paper } from "@mui/material";
import logo4 from "../assets/img/Logo4.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { useState } from "react";
import { registrarUsuario } from "../Services/supabase.js";
import { useNavigate } from 'react-router-dom';

function PaginaInicioRegistrar() {
 // Importa useNavigate de react-router-dom

const [error, setError] = useState('');
const [values, setValues] = useState({
  email: "",
  password: "",
});

const navigate = useNavigate(); // Inicializa el hook de navegación

const handleChange = (e) => {
  setValues({
    ...values,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!values.email || !values.password) {
    setError("Correo y Contraseña son obligatorios");
    console.log("No puedes dejar los campos vacíos.");
    return;
  }

  setError("");

  // Llamar a la función registrarUsuario
  const result = await registrarUsuario({
    email: values.email,
    password: values.password,
  });

  if (result.error) {
    console.log("Error al registrar usuario:", result.error);
    setError(result.error);
  } else {
    console.log("Usuario registrado exitosamente:", result.user);
    setError("Usuario registrado correctamente. Verifica tu correo.");
    navigate('/transicion');  // Cambia '/pagina-de-bienvenida' por la ruta que desees
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
            <h1 style={{ color: "white" }}>Registrate!</h1>
            <h3 style={{ color: "white" }}>
              Únete a la familia de Coin Guard!!
            </h3>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <TextField
              variant="standard"
              focused
              label="Correo electrónico"
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
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
              focused
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              required
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiInput-underline:after": { borderBottomColor: "black" },
                backgroundColor: "transparent",
              }}
            />

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
              onClick={handleSubmit}
            >
              Registrarse
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
export default PaginaInicioRegistrar;