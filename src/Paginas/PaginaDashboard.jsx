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

    const [open, setOpen] = useState(false);
    const openDialog = () => {
        setOpen(true);
    }
    const closeDialog = () => {
        setOpen(false);
    }


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
                                            Monto actual
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            Aqui va el valor de la plata del usuario
                                            se debe ir actualizando a medida q hayan ingresos o egresos
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
                                            Igresos
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            total: 1200$
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
                                            Egresos
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            total: 150
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
                                                        label="Nombre" 
                                                        ></TextField>

                                                        <TextField 
                                                        variant="outlined" 
                                                        label="Cantidad" 
                                                        type="number"
                                                        inputProps={{min:"0", step:"0.01"}}
                                                        onChange={(e) => {
                                                            const value = parseFloat(e.target.value);
                                                            if (value < 0) e.target.value = ""; // resetea si es negativo
                                                        }}
                                                        ></TextField>

                                                        <TextField 
                                                        variant="outlined" 
                                                        label="Fecha"
                                                        type="date"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        ></TextField>
                                                    </Stack>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button variant="contained" color="success" onClick={closeDialog}>Ingreso</Button> {/* este boton debe enviar info a la base de datos */}
                                                    <Button variant="contained" color="error" onClick={closeDialog}>Egreso</Button> {/* este boton debe enviar info a la base de datos */}
                                                </DialogActions>
                                            </Dialog>

                                        </Stack>  
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            +500$ de algo,
                                            -120$ de otra cosa
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
                                                    Aquí iria la lista de cosas si es q lo implementan
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
