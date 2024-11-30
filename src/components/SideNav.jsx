import { Box, CssBaseline, Drawer, Toolbar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PropTypes from 'prop-types';  
import PaginaIngresos from '../Paginas/PaginaIngresos';
import PaginaDashboard from '../Paginas/PaginaDashboard';
import PaginaEgresos from '../Paginas/PaginaEgresos';
import Paginarecordatorios from '../Paginas/Paginarecordatorios';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 225;

export default function SideNav({ open, onClose }) {

    const navigate = useNavigate();

    const handleIngreso = () =>{
        navigate("/ingresos")
    };

    const handleDashboard = () =>{
        navigate("/dashboard")
    }

    const handleEgreso = () =>{
        navigate("/egresos")
    }

    const handleRecordatorio = () =>{
        navigate("/recordatorios")
    }

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
            onClose={onClose} 
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
                            if(text === "Resúmen") handleDashboard();
                            if(text === "Egresos") handleEgreso();
                            if(text === "Recordatorios") handleRecordatorio();
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


SideNav.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
