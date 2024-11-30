import SideNav from "../components/SideNav";
import Header from "../components/Header";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid2";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import AddCardIcon from '@mui/icons-material/AddCard';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import SavingsIcon from '@mui/icons-material/Savings';
import { LineChart } from "@mui/x-charts";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import MostrarCantidad from "../Funciones/MostrarCantidad";
import MostrarUltimoIngreso from "../Funciones/MostrarUltimoIngreso";
import MostrarUltimoEgreso from "../Funciones/MostrarUltimoEgreso";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../Services/supabase.js";
import Tareasdash from "../Funciones/Tareasdash.jsx";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#20314f', // #0D1127
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#060618',
    }),
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.20s cubic-bezier(0, 0, 0, 1)', // transición suave
  '&:hover': {
    background: 'linear-gradient(163deg, #007ca4 0%, #294067 100%)',
  }
}));

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#006992', 
    borderRadius: '10px',
    color: '#FFFFFF', // color del texto
    padding: theme.spacing(2),
    '& .MuiTypography-root': {
        color: '#FFFFFF', // ajustar el color de todos los textos dentro del Card
    },
    cursor: 'pointer', 
    transition: 'all 0.25s cubic-bezier(0, 0, 0, 1)', // transición suave
  '&:hover': {
    transform: 'scale(0.98)', // efecto de escala
    backgroundColor: '#294067', 
  },
  '&:before': {
    content: '""', // pseudo-elemento para el borde
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '10px', // igual al radio de la card
    padding: '2px', // grosor del borde
    background: 'linear-gradient(163deg, #3c91f9 0%, #72faca 100%)', // gradiente
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    maskComposite: 'exclude',
    WebkitMaskComposite: 'xor', // soporte para navegadores basados en Webkit
    zIndex: -1, // asegura que quede detrás del contenido
  },
  '& .MuiTypography-root': {
    color: '#FFFFFF', // ajustar el color de los textos dentro de la card
  },
}));



function PaginaDashboard() {
    const { user } = useAuth(); 
    const [open, setOpen] = useState(false);
    const [cantidad, setCantidad] = useState(""); 
    const [nombre, setNombre] = useState(""); 
  
    
    const openDialog = () => setOpen(true);
  
    
    const closeDialog = () => setOpen(false);
  
    
    
    // Función para insertar un ingreso
    const handleIngreso = async () => {
      if (!user) {
        alert("Debes estar autenticado para realizar un ingreso.");
        return;
      }
  
      if (!nombre || cantidad <= 0) {
        alert("Por favor, ingresa un nombre válido y una cantidad mayor a 0.");
        return;
      }
  
      try {
        const { data, error } = await supabase
          .from("ingreso") 
          .insert([
            {
              cantidad: parseFloat(cantidad),
              uuid: user.id, 
              nombre: nombre, 
              creado_en: new Date(),
              actualizado_en: new Date(),
            },
          ]);
  
        if (error) {
          console.error("Error al guardar el ingreso:", error.message);
          alert("Error al guardar el ingreso.");
        } else {
          console.log("Ingreso guardado:", data);
          alert("Ingreso guardado correctamente.");
        }
      } catch (error) {
        console.error("Error inesperado:", error);
        alert("Hubo un error al guardar el ingreso.");
      }
      setOpen(false); 
    };
  
    // Función para insertar un egreso
    const handleEgreso = async () => {
      if (!user) {
        alert("Debes estar autenticado para realizar un egreso.");
        return;
      }
  
      if (!nombre || cantidad <= 0) {
        alert("Por favor, ingresa un nombre válido y una cantidad mayor a 0.");
        return;
      }
  
      try {
        const { data, error } = await supabase
          .from("egreso") 
          .insert([
            {
              cantidad: parseFloat(cantidad),
              uuid: user.id, 
              nombre: nombre, 
              creado_en: new Date(),
              actualizado_en: new Date(),
            },
          ]);
  
        if (error) {
          console.error("Error al guardar el egreso:", error.message);
          alert("Error al guardar el egreso.");
        } else {
          console.log("Egreso guardado:", data);
          alert("Egreso guardado correctamente.");
        }
      } catch (error) {
        console.error("Error inesperado:", error);
        alert("Hubo un error al guardar el egreso.");
      }
      setOpen(false); 
    };
  


    return (
        <>
            <Header />
            <Box height={30} />
            <Box 
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: `
                  linear-gradient(
                    135deg,
                    #0D1127 25%,
                    #11162b 25%,
                    #11162b 50%,
                    #0D1127 50%,
                    #0D1127 75%,
                    #11162b 75%,
                    #11162b
                  )
                `,
                backgroundColor: "#121212", // Fallback color
                backgroundSize: "40px 40px",
                animation: "move 4s linear infinite",
                "@keyframes move": {
                  "0%": {
                    backgroundPosition: "0 0",
                  },
                  "100%": {
                    backgroundPosition: "40px 40px",
                  },
                },
              }}
              >
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 8 }}>

                    {/* contenido del dashboard de aqui pa abajo */}
                    <Grid container spacing={4}>
                        <Stack direction={"row"} spacing={5}>

                        {/* plata total */}
                        <Grid size={4}>
                            <Item>
                                <StyledCard sx={{ maxWidth: 750, height: 218}}>
                                    <CardContent>  
                                        <Typography gutterBottom variant="h5" component="div">
                                        <SavingsIcon style={{float:'right', color:"#5BF561"}}/>
                                            
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        <MostrarCantidad />
                                        </Typography>
                                    </CardContent>
                                </StyledCard>
                            </Item>
                        </Grid>

                        {/* ingreso y egresos */}
                        <Grid size={3}>
                            <Item>
                                <Stack spacing={2}>
                                <Card
                                      sx={{
                                        maxWidth: 250, // Tamaño máximo de la card
                                        backgroundColor: '#006992', // Fondo inicial
                                        color: '#FFFFFF', // Color del texto
                                        borderRadius: '10px', // Bordes redondeados
                                        position: 'relative', // Necesario para el pseudo-elemento
                                        overflow: 'hidden', // Evitar desbordes
                                        cursor: 'pointer', // Cursor en hover
                                        transition: 'all 0.25s cubic-bezier(0, 0, 0, 1)', // Transición suave
                                        '&:hover': {
                                          transform: 'scale(0.98)', // Efecto de escala al hacer hover
                                          backgroundColor: '#294067', // Cambio de color al pasar el mouse
                                        },
                                        '&:before': {
                                          content: '""', // Pseudo-elemento para el borde
                                          position: 'absolute',
                                          top: 0,
                                          left: 0,
                                          right: 0,
                                          bottom: 0,
                                          borderRadius: '10px', // Igual al radio de la card
                                          padding: '2px', // Grosor del borde
                                          background: 'linear-gradient(163deg, #3c91f9 0%, #72faca 100%)', // Gradiente
                                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                          maskComposite: 'exclude',
                                          WebkitMaskComposite: 'xor', // Compatibilidad con navegadores basados en Webkit
                                          zIndex: -1, // Asegurar que quede detrás del contenido
                                        },
                                        '& .MuiTypography-root': {
                                          color: '#FFFFFF', // Ajuste del color del texto dentro de la card
                                        },
                                      }}>
                                    <CardContent>  
                                        <Typography gutterBottom variant="h5" component="div">
                                        <ArrowCircleUpIcon style={{float:'right', color:"#5BF561"}} />
                                        {/*ingreso*/}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        <MostrarUltimoIngreso />
                                        </Typography>
                                    </CardContent>
                                </Card>

                                <Card sx={{
                                        maxWidth: 250, // Tamaño máximo de la card
                                        backgroundColor: '#006992', // Fondo inicial
                                        color: '#FFFFFF', // Color del texto
                                        borderRadius: '10px', // Bordes redondeados
                                        position: 'relative', // Necesario para el pseudo-elemento
                                        overflow: 'hidden', // Evitar desbordes
                                        cursor: 'pointer', // Cursor en hover
                                        transition: 'all 0.25s cubic-bezier(0, 0, 0, 1)', // Transición suave
                                        '&:hover': {
                                          transform: 'scale(0.98)', // Efecto de escala al hacer hover
                                          backgroundColor: '#294067', // Cambio de color al pasar el mouse
                                        },
                                        '&:before': {
                                          content: '""', // Pseudo-elemento para el borde
                                          position: 'absolute',
                                          top: 0,
                                          left: 0,
                                          right: 0,
                                          bottom: 0,
                                          borderRadius: '10px', // Igual al radio de la card
                                          padding: '2px', // Grosor del borde
                                          background: 'linear-gradient(163deg, #3c91f9 0%, #72faca 100%)', // Gradiente
                                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                          maskComposite: 'exclude',
                                          WebkitMaskComposite: 'xor', // Compatibilidad con navegadores basados en Webkit
                                          zIndex: -1, // Asegurar que quede detrás del contenido
                                        },
                                        '& .MuiTypography-root': {
                                          color: '#FFFFFF', // Ajuste del color del texto dentro de la card
                                        },
                                      }}>
                                    <CardContent>  
                                        <Typography gutterBottom variant="h5" component="div">
                                        <ArrowCircleDownIcon style={{float:'right', color:"#f55b5b"}} />
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        <MostrarUltimoEgreso />
                                        </Typography>
                                    </CardContent>
                                </Card>
                                </Stack>
                            </Item>
                        </Grid>

                        {/* aqui se añaden los ingresos y los egresos
                        es como una lista */}
                        <Grid size={5}>
                            <Item>
                                <StyledCard sx={{ maxWidth: 750, height: 218 }}>
                                    <CardContent>
                                        <Stack direction={"row"} spacing={12}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Añadir una transacción
                                            </Typography>

                                            <IconButton style={{float:'right', backgroundColor:'#2a702c', color:"#5BF561"}} onClick={openDialog}> <AddCardIcon></AddCardIcon> </IconButton>
                                            {/* <Button variant='contained' onClick={openDialog}> + </Button> */}
                                            <Dialog open={open} onClose={closeDialog} fullWidth aria-labelledby='dialog-title' >
                                                <DialogTitle> Añadir transacción
                                                <IconButton style={{float:'right', color:'#f55b5b'}} onClick={closeDialog}> <Close></Close> </IconButton>
                                                </DialogTitle>
                                                <DialogContent dividers>
                                                    <Stack spacing={2} margin={2}>
                                                       
                                                        <TextField 

                                                         variant="outlined"
                                                         label="Nombre de la transacción"
                                                         value={nombre}
                                                         onChange={(e) => setNombre(e.target.value)}
                                                        ></TextField>

                                                        <TextField 
                                                          variant="outlined"
                                                          label="Cantidad"
                                                          type="number"
                                                          inputProps={{ min: "0", step: "0.01" }}
                                                          value={cantidad}
                                                          onChange={(e) => setCantidad(e.target.value)}
                                                        ></TextField>

                                                       
                                                    </Stack>
                                                </DialogContent>
                                                <DialogActions>
                                                <Button
  variant="contained"
  color="success"
  onClick={async () => {
    await handleIngreso(); 
    window.location.reload(); 
  }}
  disabled={!cantidad || cantidad <= 0 || !nombre} 
>
  Ingreso
</Button>

<Button
  variant="contained"
  color="error"
  onClick={async () => {
    await handleEgreso(); 
    window.location.reload(); 
  }}
  disabled={!cantidad || cantidad <= 0 || !nombre} 
>
  Egreso
</Button>

                  </DialogActions>
                                            </Dialog>

                                        </Stack>  
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            
                                        </Typography>
                                    </CardContent>
                                </StyledCard>
                            </Item>
                        </Grid>

                        </Stack>

                        {/* gráfica */}
                        <Grid item xs={12}>
                            <Stack direction={"row"} spacing={2}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
                                    <LineChart sx={{fill:'white', stroke:'white'}}
                                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]} //investigar como meterle datos, aqui iria los meses
                                        series={[
                                            {
                                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                                                area: true,
                                                color: '#0094a4',

                                                areaOpacity: 0.3,
                                            },
                                        ]}
                                        width={850}
                                        height={300}
                                        
                                        grid={{ vertical: true, horizontal: true,}}

                                    />
                                </Box>

                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Item>
                                        <StyledCard sx={{width: 300}}>
                                            <CardContent>
                                                <Typography>
                                                   <Tareasdash/>
                                                </Typography>
                                            </CardContent>
                                        </StyledCard>
                                    </Item>
                                </Box>
                            </Stack>
                        </Grid>

                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default PaginaDashboard;
