import { Container, Box, Button, TextField } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import logo3 from "../assets/img/logo3.json";
import {supabase} from "../Services/supabase.js";
import { useState, useEffect } from "react";


function PaginaMonto() {
  const [cantidad, setCantidad] = useState(""); // Guardamos el valor de la cantidad en el estado
  const [uuid, setUuid] = useState(""); // Estado para almacenar el uuid del usuario

  // Recuperar la cantidad guardada en localStorage al cargar la página
  useEffect(() => {
    const cantidadGuardada = localStorage.getItem("cantidad");
    if (cantidadGuardada) {
      setCantidad(cantidadGuardada); // Establecer el valor recuperado en el estado
    }

    // Verificar la sesión activa y obtener el uuid del usuario autenticado
    const fetchUser = async () => {
      try {
        const { data: session, error } = await supabase.auth.getSession();

        // Verificar si hay algún error al obtener la sesión
        if (error) {
          console.error("Error al obtener la sesión:", error);
          return;
        }

        if (session && session.user) {
          setUuid(session.user.id); // Guardamos el uuid del usuario activo
        } else {
          console.log("No hay sesión activa.");
        }
      } catch (error) {
        console.error("Error al intentar obtener la sesión:", error);
      }
    };

    fetchUser();
  }, []); // Ejecutar solo al cargar la página

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    if (!cantidad) {
      alert("Por favor, ingresa un valor para la cantidad.");
      return;
    }

    if (!uuid) {
      alert("Usuario no autenticado.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("monto") // Nombre de la tabla
        .insert([
          {
            cantidad: cantidad, // Insertar solo la cantidad en la base de datos
            uuid: uuid, // Asociar el uuid del usuario
          },
        ]);

      if (error) {
        console.error("Error al insertar monto:", error);
      } else {
        console.log("Monto insertado:", data);

        // Guardar la cantidad en localStorage para que persista
        localStorage.setItem("cantidad", cantidad);

        // Limpiar el campo después de insertar
        setCantidad("");
      }
    } catch (error) {
      console.error("Error al insertar en Supabase:", error);
    }
  };

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
              onChange={(e) => setCantidad(e.target.value)} // Actualizar el estado con el valor ingresado
              InputProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
                backgroundColor: "transparent",
                marginBottom: "20px", // Asegura que haya espacio entre la línea y el botón
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
          color : 'white'
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