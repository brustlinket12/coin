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
}));

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#294067', 
    color: '#FFFFFF', // color del texto
    padding: theme.spacing(2),
    '& .MuiTypography-root': {
        color: '#FFFFFF', // ajusta el color de todos los textos dentro del Card
    },
}));



function PaginaDashboard() {
    const { user } = useAuth(); // Obtener el usuario autenticado
    const [open, setOpen] = useState(false);
    const [cantidad, setCantidad] = useState(""); // Estado para la cantidad ingresada
    const [nombre, setNombre] = useState(""); // Estado para el nombre de la transacción
  
    // Abre el diálogo
    const openDialog = () => setOpen(true);
  
    // Cierra el diálogo
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
          .from("ingreso") // Tabla ingreso
          .insert([
            {
              cantidad: parseFloat(cantidad),
              uuid: user.id, // Usamos el UUID del usuario autenticado
              nombre: nombre, // Agregamos el nombre de la transacción
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
      setOpen(false); // Cierra el diálogo después de insertar
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
          .from("egreso") // Tabla egreso
          .insert([
            {
              cantidad: parseFloat(cantidad),
              uuid: user.id, // Usamos el UUID del usuario autenticado
              nombre: nombre, // Agregamos el nombre de la transacción
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
      setOpen(false); // Cierra el diálogo después de insertar
    };
  


    return (
        <>
            <Header />
            <Box height={30} />
            <Box sx={{ display: "flex", backgroundColor:'#0D1127' }}>
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
                                <Card sx={{ 
                                            maxWidth: 250, 
                                            backgroundColor: '#294067', 
                                            color: '#FFFFFF', 
                                            '& .MuiTypography-root': {
                                                color: '#FFFFFF', // ajusta el color de todos los textos dentro del Card 
                                            }
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
                                            maxWidth: 250, 
                                            backgroundColor: '#294067', 
                                            color: '#FFFFFF', 
                                            '& .MuiTypography-root': {
                                                color: '#FFFFFF', // ajusta el color de todos los textos dentro del Card 
                                            }
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
    await handleIngreso(); // Espera a que se complete el ingreso
    window.location.reload(); // Recarga la página después de insertar el ingreso
  }}
  disabled={!cantidad || cantidad <= 0 || !nombre} // Deshabilitar si no hay cantidad válida o nombre
>
  Ingreso
</Button>

<Button
  variant="contained"
  color="error"
  onClick={async () => {
    await handleEgreso(); // Espera a que se complete el egreso
    window.location.reload(); // Recarga la página después de insertar el egreso
  }}
  disabled={!cantidad || cantidad <= 0 || !nombre} // Deshabilitar si no hay cantidad válida o nombre
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
                                                color: '#59a14f',

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
