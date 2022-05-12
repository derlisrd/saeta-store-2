
import { useRef, useState } from 'react';



// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText,Icon } from '@mui/material'


// ----------------------------------------------------------------------

export default function MoreMenu({borrar,abrir,filaProps}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon color="success">more</Icon>
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={()=>{abrir(filaProps)}}  sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
          <Icon color="primary">mode_edit</Icon>
          </ListItemIcon>
          <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={()=>{borrar(filaProps)}} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon color="secondary" >delete_outline</Icon>
          </ListItemIcon>
          <ListItemText primary="Borrar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

      </Menu>
    </>
  );
}
