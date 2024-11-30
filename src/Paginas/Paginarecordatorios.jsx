import {
  Container,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import recordatorio_animation from "../assets/img/recordatorio_animation.json";
import QueueIcon from "@mui/icons-material/Queue";
import CheckIcon from "@mui/icons-material/Check";
import { supabase } from "../Services/supabase.js"; // Ajusta la ruta al archivo supabase.js
import Header from "../components/Header.jsx";
import { Typography } from "@mui/material";

function Recordatorios() {
  const [open, setOpen] = useState(false);
  const [recordatorios, setRecordatorios] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    // Obtener los recordatorios desde Supabase
    fetchRecordatorios();
  }, []);

  const fetchRecordatorios = async () => {
    const { data, error } = await supabase
      .from("tareas") // Cambia 'tareas' al nombre de tu tabla si es necesario
      .select("*");

    if (error) {
      console.error("Error al cargar los recordatorios:", error);
    } else {
      setRecordatorios(data);
    }
  };

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleSaveRecordatorio = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error al obtener el usuario:", userError);
      return;
    }

    if (!user) {
      console.error("No hay usuario autenticado.");
      return;
    }

    const userUUID = user.id;

    const { data, error } = await supabase
      .from("tareas") // Cambia 'tareas' al nombre de tu tabla si es necesario
      .insert([
        {
          titulo,
          descripcion,
          monto,
          fecha,
          uuid: userUUID,
        },
      ]);

    if (error) {
      console.error("Error al guardar el recordatorio:", error);
    } else {
      if (Array.isArray(data)) {
        setRecordatorios([...recordatorios, ...data]);
        closeDialog();
      } else {
        console.error("La respuesta no es un array:", data);
      }
    }
  };

  const handleDeleteRecordatorio = async (index, id) => {
    const { error } = await supabase
      .from("tareas") // Cambia 'tareas' al nombre de tu tabla si es necesario
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error al eliminar el recordatorio:", error);
    } else {
      const nuevosRecordatorios = recordatorios.filter((_, i) => i !== index);
      setRecordatorios(nuevosRecordatorios);
    }
  };

  return (
    <Container>
      <Header />
      <Box
        sx={{
          height: "100vh", // Asegura que el fondo ocupe toda la altura de la pantalla
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start", // Cambié "center" a "flex-start" para que los elementos se alineen desde la parte superior
          alignItems: "center",
          backgroundColor: "rgba(6, 6, 34, 10)",
          borderRadius: "16px",
          position: "relative",
          overflow: "auto", // Asegurando que todo el contenido sea desplazable
          marginTop: "40px", // Espacio entre el header y los recordatorios
          flexGrow: 10,
          overflowX: "hidden", // Desactiva el scroll horizontal
          overflowY: "auto", // Desactiva el scroll horizontal
        }}
      >
        <IconButton
          style={{
            position: "absolute",
            top: "70px",
            right: "60px",
            backgroundColor: "#808080",
            color: "#FFFFFF",
            fontSize: "90px",
          }}
          onClick={openDialog}
        >
          <QueueIcon />
        </IconButton>

        {recordatorios.length === 0 && (
          <>
            <Player
              autoplay
              loop
              src={recordatorio_animation}
              style={{ height: "100%", width: "350px" }}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: "24px",
                color: "#fff",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              ¿Tienes que realizar algún pago en próximas fechas?
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: "20px",
                color: "#fff",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              ¡Crea un recordatorio!
            </Typography>
          </>
        )}

        {recordatorios.length > 0 && (
          <div
            style={{
              width: "100%",
              maxHeight: "calc(100vh - 100px)", // Deja espacio para otros elementos como los botones
              overflowY: "auto", // Habilita el desplazamiento vertical
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              {recordatorios.map((recordatorio, index) => (
                <Box
                  key={index}
                  sx={{
                    marginBottom: "20px",
                    width: "100%",
                    maxWidth: "800px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "8px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p style={{ color: "black" }}>
                      <strong>Titulo:</strong> {recordatorio.titulo}
                    </p>
                  </div>

                  <TableContainer>
                    <Table
                      sx={{ minWidth: 650 }}
                      aria-label="recordatorio-table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <strong>Descripción</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Monto</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Fecha</strong>
                          </TableCell>
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

                  <Chip
                    label="Hecho"
                    onDelete={() =>
                      handleDeleteRecordatorio(index, recordatorio.id)
                    }
                    deleteIcon={<CheckIcon />}
                    sx={{
                      margin: "10px 0",
                      backgroundColor: "#d3d3d3",
                      color: "#000",
                      borderRadius: "8px",
                      width: "auto",
                      alignSelf: "flex-end",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </div>
        )}

        <Dialog
          open={open}
          onClose={closeDialog}
          fullWidth
          aria-labelledby="dialog-title"
        >
          <DialogTitle sx={{ position: "relative" }}>
            Añadir Recordatorio
            <IconButton
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                color: "#f55b5b",
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
            <Button
              variant="contained"
              color="success"
              onClick={async () => {
                await handleSaveRecordatorio();
                window.location.reload();
              }}
            >
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
