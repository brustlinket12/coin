import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid2";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useAuth } from "../context/AuthContext"; // Asegúrate de tener el contexto de autenticación
import { supabase } from "../Services/supabase.js"; // Asegúrate de que la ruta de supabase esté correcta

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#294067',
    color: '#FFFFFF',
    padding: theme.spacing(2),
    '& .MuiTypography-root': {
        color: '#FFFFFF',
    },
    width: '100%',
    boxSizing: 'border-box',
}));

function Paginaingresos() {
    const { user, loading } = useAuth(); // Obtenemos el usuario desde el contexto
    const [egresos, setEgresos] = useState([]); // Estado para guardar los egresos

    // Función para obtener los egresos desde Supabase
    useEffect(() => {
        const fetchEgresos = async () => {
            try {
                if (user) {
                    const { data, error } = await supabase
                        .from("ingreso")
                        .select("id, cantidad, nombre, creado_en")
                        .eq("uuid", user.id) // Filtrar por UUID del usuario
                        .order("creado_en", { ascending: false }); // Ordenar por fecha descendente

                    if (error) {
                        console.error("Error al obtener egresos:", error.message);
                        return;
                    }

                    setEgresos(data || []); // Si no hay datos, asignamos un array vacío
                }
            } catch (error) {
                console.error("Error inesperado:", error);
            }
        };

        if (!loading && user) {
            fetchEgresos();
        }
    }, [user, loading]); // Dependencia en el usuario y el estado de carga

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!user) {
        return <p>No estás autenticado. Por favor, inicia sesión.</p>;
    }

    return (
        <>
            <Header />
            <Box height={30} />
            <Box sx={{ display: "flex", height: '100vh', width:'100vw', backgroundColor: '#0D1127' }}>
                <SideNav />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 8,
                        height: '100%',
                        overflow: "auto",
                        width: '100%'
                    }}
                >
                    <Grid container direction="column" spacing={2} sx={{ width: '100%' }}>
                        {egresos.map((egreso) => (
                            <Grid item key={egreso.id}>
                                <StyledCard>
                                    <CardContent>
                                        <h2>{egreso.nombre}</h2>
                                        <p>Cantidad: ${egreso.cantidad}</p>
                                        <p>Fecha: {new Date(egreso.creado_en).toLocaleDateString()}</p>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default Paginaingresos;
