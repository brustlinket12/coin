import { Container, Box, Button } from "@mui/material";
import logo1 from "../assets/img/logo1.png";
import resumen from "../assets/img/resumen.png";

export default function Recordatorios() {
  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      {/*Izquierda */}
      <Container
        maxWidth="xl"
        style={{
          border: "0.1px  solid white",
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
          <img
            src={logo1}
            alt="Descripción del logo"
            style={{
              width: "90px",
              height: "auto",
              marginBottom: "50px",
              marginRight: "400px",
              marginTop: "-200px"
            }}
          />
          <br></br>
          
          <img
            src={resumen}
            alt="Descripción del logo"
            style={{
              width: "90px",
              height: "auto",
              marginBottom: "50px",
              marginRight: "400px",
 
            }}
          />
          <br></br>
          
          <img
            src={logo1}
            alt="Descripción del logo"
            style={{
              width: "90px",
              height: "auto",
              marginBottom: "50px",
              marginRight: "400px",
 
            }}
          />
          <br></br>
          
          <img
            src={logo1}
            alt="Descripción del logo"
            style={{
              width: "90px",
              height: "auto",
              marginBottom: "50px",
              marginRight: "400px",
 
            }}
          />
           <br></br>
          
          <img
            src={logo1}
            alt="Descripción del logo"
            style={{
              width: "90px",
              height: "auto",
              marginBottom: "50px",
              marginRight: "400px",
 
            }}
          />
        </Box>
      </Container>
      <Container
        maxWidth="xl"
        style={{
          padding: "16px",
          height: "800px",
          width: "1100px",
          backgroundColor: "rgba(12, 13, 22, 1)",
        }}
      >
        
      </Container>
      </Box>
  )
}