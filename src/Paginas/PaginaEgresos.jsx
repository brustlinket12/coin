import React, { useState } from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid2";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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

function PaginaEgresos() {
    // Simulando datos dinámicos
    const [egresos, setEgresos] = useState([
        /*
        ? descripction: "Descripción del egreso" <==== ESTO LO PUEDES CAMBIAR POR LA CANTIDAD
        ? PORQUE EN EL DASHBOARD CREO QUE NO ESTÁ PIDIENDO NINGUNA DESCRIPCIÓN NAMA NOMBRE Y PLATA O NOSE
        */
        { id: 1, title: "Egreso 1", description: "Descripción del Egreso 1" },
        { id: 2, title: "Egreso 2", description: "Descripción del Egreso 2" },
        { id: 3, title: "Egreso 3", description: "Descripción del Egreso 3" },
    ]);

    /* 
    ! ESTA PARTE DE ACA ES DONDE RECOGE LOS DATOS DEL POP UP QUE ESTÁ EN EL DASHBOARD 
    ! TE TOCA BUSCAR COMO PASARLOS, PERO POR LO QUE VI, SEGUN PEDRO ES CON UN 'useEffect' UNA VAINA ASÍ
    ! PREGUNTALE A VER QUE TE DICE  
    */

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
                    <Grid container direction="column" spacing={2} sx={{width: '100%'}} >
                        {egresos.map((egreso) => (
                            <Grid item key={egreso.id}>
                                <StyledCard>
                                    <CardContent>
                                        <h2>{egreso.title}</h2>
                                        <p>{egreso.description}</p>
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

export default PaginaEgresos;
