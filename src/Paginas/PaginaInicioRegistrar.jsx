import { Box, Button, TextField, Paper } from "@mui/material";
import logo4 from "../assets/img/Logo4.json";
import { Player } from "@lottiefiles/react-lottie-player";

function PaginaInicioRegistrar() {
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
            <h1 style={{ color: "white" }}>Registrate</h1>
            <h3 style={{ color: "white" }}>Unete a la familia de Coin Guard!!</h3>

            <TextField
              variant="standard"
              focused
              label=" Correo electronico"
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
              label="Nombre de usuario"
              focused
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
              label="Contrasena"
              focused
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
            >
              iniciar sesión
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
export default PaginaInicioRegistrar;
