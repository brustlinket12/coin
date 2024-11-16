import { useState } from 'react';
import { IconButton, Toolbar } from '@mui/material';
import SideNav from './SideNav';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    return (
        <>
                <Toolbar
                disablePadding>
                    <IconButton
                    color = "inherit"
                    size = "large"
                    onClick={handleDrawerOpen}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            
            <SideNav open={open} onClose={handleDrawerClose} />
        </>
    );
}