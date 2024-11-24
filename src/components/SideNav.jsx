import { Box, CssBaseline, Drawer, Toolbar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PropTypes from 'prop-types';  // Importa PropTypes
import PaginaIngresos from '../Paginas/PaginaIngresos';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 225;

export default function SideNav({ open, onClose }) {

    const navigate = useNavigate();

    const handleIngreso = () =>{
        navigate("/ingresos")
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: '#294067',
                    color: '#FFFFFF'
                },
            }}
            open={open}
            onClose={onClose} // Llamará a `onClose` para cerrar el Drawer
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <List>
                {['Resúmen', 'Ingresos', 'Egresos', 'Recordatorios'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                        
                        onClick={() =>{
                            if(text === "Ingresos") handleIngreso();
                        }}

                        >
                            <ListItemIcon sx={{ color: 'white' }}>
                                {index % 4 === 0 ? (
                                    <DashboardIcon />
                                ) : index % 4 === 1 ? (
                                    <TrendingUpIcon />
                                ) : index % 4 === 2 ? (
                                    <TrendingDownIcon />
                                ) : (
                                    <FormatListBulletedIcon />
                                )}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    </Box>
    );
}

// Agrega validación de las props
SideNav.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
