import { Container, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import recordatorio_animation from "../assets/img/recordatorio_animation.json";
import QueueIcon from '@mui/icons-material/Queue';
import CheckIcon from '@mui/icons-material/Check';  // Icono de "hecho" (gancho)

function Recordatorios() {
  const [open, setOpen] = useState(false);
  const [recordatorios, setRecordatorios] = useState([]); // Estado para almacenar los recordatorios
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleSaveRecordatorio = () => {
    // Guardar los datos del recordatorio en el estado
    const nuevoRecordatorio = {
      titulo,
      descripcion,
      monto,
      fecha,
    };

    setRecordatorios([...recordatorios, nuevoRecordatorio]);
    closeDialog(); // Cerrar el diálogo después de guardar
  };

  const handleDeleteRecordatorio = (index) => {
    // Eliminar el recordatorio usando el índice
    const nuevosRecordatorios = recordatorios.filter((_, i) => i !== index);
    setRecordatorios(nuevosRecordatorios);
  };

  return (
    <Container>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(6, 6, 34, 10)",
          overflow: "hidden",
          borderRadius: "16px",
          position: "relative",
        }}
      >
        {/* Botón para abrir el dialog */}
        <IconButton
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: '#808080',
            color: "#FFFFFF"
          }}
          onClick={openDialog}
        >
          <QueueIcon />
        </IconButton>

        {/* Mostrar la animación solo si no hay recordatorios */}
        {recordatorios.length === 0 && (
          <>
            <Player
              autoplay
              loop
              src={recordatorio_animation}
              style={{ height: "100%", width: "350px" }}
            />
            <h2>¿Tienes que realizar algún pago en próximas fechas?</h2>
            <h2>¡Crea un recordatorio!</h2>
          </>
        )}

        {/* Mostrar los recordatorios si existen */}
        {recordatorios.length > 0 && (
          <div>
            <h3>Recordatorios:</h3>
            {/* Mostrar cada recordatorio en una barra con la opción de "hecho" */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              {recordatorios.map((recordatorio, index) => (
                <Box
                  key={index}
                  sx={{
                    marginBottom: '20px',
                    width: '100%',
                    maxWidth: '800px',
                    backgroundColor: '#f0f0f0', // Fondo gris
                    borderRadius: '8px', // Bordes redondeados
                    padding: '10px', // Espaciado interior
                    display: 'flex', // Alinear el título y el chip
                    flexDirection: 'column', // Columna para tener la tabla arriba
                    alignItems: 'flex-start', // Alineación izquierda para la tabla
                    justifyContent: 'space-between', // Espaciado entre el título y la tabla
                  }}
                >
                  {/* Título del recordatorio */}
                  <div>
                    <p style={{ color: 'black' }}><strong>Titulo:</strong> {recordatorio.titulo}</p>
                    </div>



                  {/* Tabla con los datos del recordatorio */}
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="recordatorio-table">
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Descripción</strong></TableCell>
                          <TableCell><strong>Monto</strong></TableCell>
                          <TableCell><strong>Fecha</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{recordatorio.descripcion}</TableCell>
                          <TableCell>${recordatorio.monto}</TableCell>
                          <TableCell>{recordatorio.fecha}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Chip con la opción de eliminar al lado derecho */}
                  <Chip
                    label="Hecho"
                    onDelete={() => handleDeleteRecordatorio(index)}  // Acción de eliminar
                    deleteIcon={<CheckIcon/>}  // Icono de eliminar (bote de basura)
                    sx={{
                      margin: '10px 0',
                      backgroundColor: '#d3d3d3', // Fondo gris claro para el Chip
                      color: '#000',
                      borderRadius: '8px',
                      width: 'auto',
                      alignSelf: 'flex-end', // Alineación a la derecha
                    }}
                  />
                </Box>
              ))}
            </Box>
          </div>
        )}

        {/* El Grid y el contenido de la ventana emergente */}
        <Dialog open={open} onClose={closeDialog} fullWidth aria-labelledby='dialog-title'>
          <DialogTitle sx={{ position: "relative" }}>
            Añadir Recordatorio
            {/* Botón de cierre en la esquina superior derecha del DialogTitle */}
            <IconButton
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                color: "#f55b5b", // color rojo para el icono de cerrar
              }}
              onClick={closeDialog}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} margin={2}>
              <TextField
                variant="outlined"
                label="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="Descripción del Recordatorio"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="Monto"
                type="number"
                value={monto}
                inputProps={{ min: "0", step: "0.01" }}
                onChange={(e) => setMonto(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="Fecha"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="success" onClick={handleSaveRecordatorio}>
              Añadir
            </Button>
            <Button variant="contained" color="error" onClick={closeDialog}>
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default Recordatorios;
