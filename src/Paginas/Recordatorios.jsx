import { Container, Box, Button } from "@mui/material";
import { Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid2";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import QueueIcon from '@mui/icons-material/Queue';import { useState } from "react";
import { Close } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#20314f', // #0D1127
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
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


function Recordatorios() {
  
    const [open, setOpen] = useState(false);
    const openDialog = () => {
        setOpen(true);
    }
    const closeDialog = () => {
        setOpen(false);
    }
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
      <Grid size={5}
      >
         <Item>
             <StyledCard sx={{ maxWidth: 700, height: 100 }}>
                  <CardContent>
                      <Stack direction={"row"} spacing={12}>
                            <Typography gutterBottom variant="h5" component="div">
                                                Añadir Recordatorio
                            </Typography>
                            </Stack>  
                                        <IconButton style={{backgroundColor:' #808080', color:"#FFFFFF"}} onClick={openDialog}> <QueueIcon ></QueueIcon > </IconButton>
                                            {/* <Button variant='contained' onClick={openDialog}> + </Button> */}
                                            <Dialog open={open} onClose={closeDialog} fullWidth aria-labelledby='dialog-title' >
                                                <DialogTitle> Añadir Recordatorio
                                                <IconButton style={{ color:'#f55b5b'}} onClick={closeDialog}> <Close></Close> </IconButton>
                                                </DialogTitle>
                                                <DialogContent dividers>
                                                    <Stack spacing={2} margin={2}>
                                                        <TextField 
                                                        variant="outlined" 
                                                        label="Título" 
                                                        ></TextField>

                                                        <TextField 
                                                        variant="outlined" 
                                                        label="Descripción del Recordatorio"
                                                        ></TextField>

                                                        <TextField 
                                                        variant="outlined" 
                                                        label="Monto" 
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
                                                    <Button variant="contained" color="success" onClick={closeDialog}>Añadir</Button> {/* este boton debe enviar info a la base de datos */}
                                                    <Button variant="contained" color="error" onClick={closeDialog}>Egreso</Button> {/* este boton debe enviar info a la base de datos */}
                                                </DialogActions>
                                            </Dialog>
                                    </CardContent>
                                </StyledCard>
                            </Item>
                        </Grid>
    </Box>
  );
}
export default Recordatorios;
