import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const drawerWidth = 225;

export default function SideNav() {
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
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    {['Resúmen', 'Ingresos', 'Egresos', 'Recordatorios'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{ color: 'white' }}>
                                    {index % 4 === 0 ? (
                                        <DashboardIcon />
                                    ) : index % 4 === 1 ? (
                                        <TrendingUpIcon />
                                    ) : index % 4 === 2 ? (
                                        <TrendingDownIcon />
                                    ) : (
                                        <FormatListBulletedIcon /> // Reemplaza AnotherIcon con el ícono que deseas usar
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
