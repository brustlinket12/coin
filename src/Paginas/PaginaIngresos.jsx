import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid2";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useAuth } from "../context/AuthContext"; 
import { supabase } from "../Services/supabase.js"; 

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#294067',
    color: '#FFFFFF',
    padding: theme.spacing(2),
    '& .MuiTypography-root': {
        color: '#FFFFFF',
    },
    width: '100%',
    boxSizing: 'border-box',
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

function Paginaingresos() {
    const { user, loading } = useAuth(); 
    const [egresos, setEgresos] = useState([]); 

    // Función para obtener los egresos desde Supabase
    useEffect(() => {
        const fetchEgresos = async () => {
            try {
                if (user) {
                    const { data, error } = await supabase
                        .from("ingreso")
                        .select("id, cantidad, nombre, creado_en")
                        .eq("uuid", user.id) 
                        .order("creado_en", { ascending: false }); 

                    if (error) {
                        console.error("Error al obtener egresos:", error.message);
                        return;
                    }

                    setEgresos(data || []); // Si no na, array vacío
                }
            } catch (error) {
                console.error("Error inesperado:", error);
            }
        };

        if (!loading && user) {
            fetchEgresos();
        }
    }, [user, loading]); 

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
            <Box 
            sx={{
                width: "100vw",
                height: "100vh",
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
