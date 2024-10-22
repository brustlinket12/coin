import { Container, Box, Button, TextField } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import logo3 from "../assets/img/logo3.json";
function PaginaTutorial() {
  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      {/*Izquierda */}
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
          <h2>!Vamos a contar tus monedas!</h2>
          <h2>¿Cuántas tienes hoy?</h2>

          <TextField
            variant="standard"
            focused
            InputProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .MuiInput-underline:after": { borderBottomColor: "white" },
              backgroundColor: "transparent",
            }}
          />
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

export default PaginaTutorial;
