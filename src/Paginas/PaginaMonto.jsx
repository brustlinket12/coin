import { Container, Box, Button, TextField } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import logo3 from "../assets/img/logo3.json";
import { useState } from "react";
import { supabase } from "../Services/supabase.js";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function PaginaMonto() {
  const [cantidad, setCantidad] = useState(""); 
  const { user, loading } = useAuth();  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      alert("Verificando autenticación...");
      return;
    }

    if (!user) {
      alert("Usuario no autenticado. Por favor, inicia sesión.");
      return;
    }

    const numeroCantidad = Number(cantidad);
    if (isNaN(numeroCantidad) || numeroCantidad <= 0) {
      alert("Por favor, ingresa un número válido mayor a 0.");
      return;
    }

    try {

      const { data, error } = await supabase
        .from("ingreso") 
        .insert([{ cantidad: numeroCantidad, uuid: user.id }]); 

      if (error) {
        console.error("Error al insertar monto:", error.message);
        alert("Hubo un error al guardar el monto: " + error.message);
      } else {
        alert("Monto guardado exitosamente.");
        setCantidad(""); 
        navigate("/dashboard"); 
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      alert("Ocurrió un error inesperado. Por favor, intenta de nuevo.");
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }


  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <Container
        maxWidth="xl"
        style={{
          padding: "20px",
          height: "120vh",
          width: "500px",
          backgroundColor: "rgba(12, 52, 121, 0.30)",
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          flexDirection="column"
        >
          <h2>¡Vamos a contar tus monedas!</h2>
          <h2>¿Cuántas tienes hoy?</h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <TextField
              variant="standard"
              focused
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              InputProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
                backgroundColor: "transparent",
                marginBottom: "20px",
              }}
              placeholder="Ingresa una cantidad"
              required
            />
            <Button type="submit" variant="contained" style={{ marginTop: "20px" }}>
              Guardar
            </Button>
          </form>
        </Box>
      </Container>

      <Container
        maxWidth="xl"
        style={{
          padding: "16px",
          height: "120vh",
          width: "150vh",
          margin: "0",
          backgroundColor: "rgba(12, 13, 22, 1)",
          color: "white",
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="90vh"
          flexDirection="column"
        >
          <Player
            autoplay
            loop
            src={logo3}
            style={{ height: "530x", width: "530px" }}
          />
          <h2>"Cada centavo cuenta, así que empieza a contar."</h2>
        </Box>
      </Container>
    </Box>
  );
}

export default PaginaMonto;
