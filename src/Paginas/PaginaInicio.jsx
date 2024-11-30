import { Container, Box, Button } from "@mui/material";
import logo1 from "../assets/img/logo1.png";
import { Player } from "@lottiefiles/react-lottie-player";
import logo2 from "../assets/img/logo2.json";
import { useNavigate } from "react-router-dom";

function PaginaInicio() {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate("/inicio-sesion");  
  };

  const handleRegisterClick = () => {
    navigate("/registrar"); 
  };
  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      {/*Izquierda */}
      <Container
        maxWidth="xl"
        style={{
          padding: "16px",
          height: "800px",
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
          <div>
             <h1>CoinGuard</h1>
          </div>
          <img
            src={logo1}
            alt="Descripción del logo"
            style={{
              width: "220px",
              height: "auto",
              marginBottom: "51px",
            }}
          />

          <Button
            variant="contained"
            size="large"
            style={{
              padding: "30px 60px",
              marginBottom: "16px",
              borderRadius: "20px",
              backgroundColor: "rgba(8, 28, 53, 1)",
              boxShadow: "0px 4px 10px 0px rgba(255, 255, 255, 0.1)",
            }}
            onClick={handleLoginClick}
          >
            iniciar sesion
          </Button>

          <Button
            variant="contained"
            size="large"
            style={{
              padding: "30px 60px",
              marginBottom: "16px",
              borderRadius: "20px",
              backgroundColor: "rgba(8, 28, 53, 1)",
              boxShadow: "0px 4px 10px 0px rgba(255, 255, 255, 0.1)",
            }}
            onClick={handleRegisterClick}
          >
            registrarse
          </Button>
          <Button size="small" style={{ color: "white" }}>
          
          </Button>
        </Box>
      </Container>

      {/* Derecho */}
      <Container
        maxWidth="s"
        style={{
          padding: "16px",
          height: "800px",
          width: "1100px",
          backgroundColor: "rgba(12, 13, 22, 1)",
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          flexDirection="column"
        >
          <Player
            autoplay
            loop
            src={logo2}
            style={{ height: "530x", width: "530px" }}
          />

          <h3>
            ¡En CoinGuard, aprenderás a tomar el control de tus finanzas de
            manera sencilla y efectiva!
          </h3>
        </Box>
      </Container>
    </Box>
  );
}
export default PaginaInicio;
