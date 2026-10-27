import { Badge, Box, CircularProgress, Icon, IconButton, Menu, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNotification } from '../../Contexts/NotificationProvider';


function Notifications() {

    const {isLoading,cantidad,notificaciones,refreshDatas} = useNotification()

    const [anchorEl, setAnchorEl] = useState(null);    
    const handleClick = e => {
        setAnchorEl(e.currentTarget);
        refreshDatas()
    };
    const handleClose = () => {setAnchorEl(null)}

    
    return (
        <>
        <IconButton onClick={handleClick} >
            <Badge badgeContent={cantidad} color="error" >
                <Icon>notifications</Icon>
            </Badge>
        </IconButton>
        <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
      >
        <Box sx={{ display: 'flex', justifyContent:'center', minWidth:'300px',p:2 }}>
            {
                isLoading ? 
                <CircularProgress />
                : 
                <>
                <Stack spacing={2} >
                <Typography variant='subtitle2'>Notificaciones</Typography>
                    {
                        notificaciones.vencimiento && <Typography variant='caption'> Su suscripción pronto se vencerá, por favor, pongase en contacto con el proveedor. </Typography> 
                    }
                </Stack>
                </>
            }
        </Box>
        </Menu>
        </>
    );
}

export default Notifications;