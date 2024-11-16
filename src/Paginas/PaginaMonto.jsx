import { Container, Box, Button, TextField } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import logo3 from "../assets/img/logo3.json";
import { useState, useEffect } from "react";
import { supabase } from "../Services/supabase.js";
import { useAuth } from "../context/AuthContext";

function PaginaMonto() {
  const [cantidad, setCantidad] = useState(""); // Guardamos el valor de la cantidad en el estado
  const { user, loading } = useAuth(); // Usar el contexto de autenticación para obtener el usuario

  useEffect(() => {
    const cantidadGuardada = localStorage.getItem("cantidad");
    if (cantidadGuardada) {
      setCantidad(cantidadGuardada);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cantidad) {
      alert("Por favor, ingresa un valor para la cantidad.");
      return;
    }

    if (loading) {
      alert("Verificando autenticación...");
      return;
    }

    if (!user) {
      alert("Usuario no autenticado.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("monto")
        .insert([
          {
            cantidad: cantidad,
            uuid: user.id, // Usar el id del usuario autenticado
          },
        ]);

      if (error) {
        console.error("Error al insertar monto:", error);
      } else {
        console.log("Monto insertado:", data);
        localStorage.setItem("cantidad", cantidad);
        setCantidad("");
      }
    } catch (error) {
      console.error("Error al insertar en Supabase:", error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se verifica la sesión
  }

  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      {/* Izquierda */}
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
              required
            />
            <Button type="submit" variant="contained" style={{ marginTop: "20px" }}>
              Guardar
            </Button>
          </form>
        </Box>
      </Container>

      {/* Derecho */}
      <Container
        maxWidth="xl"
        style={{
          padding: "16px",
          height: "120vh",
          width: "150vh",
          margin: "0",
          backgroundColor: "rgba(12, 13, 22, 1)",
          color: 'white',
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
            style={{ height: "530px", width: "530px" }}
          />
          <h2>"Cada centavo cuenta, así que empieza a contar."</h2>
        </Box>
      </Container>
    </Box>
  );
}

export default PaginaMonto;
