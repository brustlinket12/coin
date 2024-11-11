import { Container, Box, Button, TextField } from "@mui/material";
import Header from "../components/Header";
function Recordatorios() {
  return (
    <>
        <Header/>
        <Box display="flex" justifyContent="center" width="100%">
            {/* Contenedor derecho */}
            <Container
            maxWidth={false} // Asegúrate de que ocupe todo el ancho
            disableGutters // Evita márgenes laterales
            style={{
                padding: "16px",
                minHeight: "100vh", // Asegúrate de que ocupe toda la altura de la pantalla
                width: "100%",
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
            <header>Recordatorios</header>
            <h1>...............................................................................</h1>
            </Box>
            </Container>
        </Box>
    </>
  );
}

export default Recordatorios;
