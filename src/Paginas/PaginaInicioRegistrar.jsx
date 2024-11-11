import { Box, Button, TextField, Paper } from "@mui/material";
import logo4 from "../assets/img/Logo4.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { useState } from "react";
import{tables} from "../types/core";
import { insertData } from "../Services/supabase";

function PaginaInicioRegistrar() {


  const [error, setError] = useState('');

const [values,setValues]=useState({
  correo:"",
  contrasena:""
})


const handleChange=(e)=>{
  setValues({
    ...values,
    [e.target.name]:e.target.value
  })
}


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!values.correo || !values.contrasena) {
    setError('Correo y Contraseña son obligatorios');
    console.log("no seas awebao  , como vas a dejas las vainas vacias");
    return;
  }


  setError('');

  const result = await insertData(tables.prueba, values);

  if (result) {
    console.log("Te felicito, campeón, ¡le metiste los datos!");
  } else {
    console.log("No papa , te faltó yuca para meter los datos bien");
  }

  console.log('Formulario enviado');
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
            <h1 style={{ color: "white" }}>Registrate</h1>
            <h3 style={{ color: "white" }}>
              Unete a la familia de Coin Guard!!
            </h3>

            <TextField
              variant="standard"
              focused
              label=" Correo electronico"
              type="text"
              name="correo"
              value={values.correo}
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
              label="Contrasena"
              focused
              type="text"
              name="contrasena"
              value={values.contrasena}
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
