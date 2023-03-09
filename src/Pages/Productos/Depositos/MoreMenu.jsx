import { useRef, useState } from 'react';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText,Icon } from '@mui/material'
import useGoto from '../../../Hooks/useGoto';




export default function MoreMenu({borrar,abrir,filaProps}) {
  const navigate = useGoto()
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
        <MenuItem onClick={()=>{ navigate.to('deposito/'+filaProps.id_deposito) }}  sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
          <Icon color="primary">content_paste</Icon>
          </ListItemIcon>
          <ListItemText primary="Lista de productos" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
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
