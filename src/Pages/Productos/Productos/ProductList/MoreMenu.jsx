import { useRef, useState } from 'react';
import { Menu, MenuItem, Fab, ListItemIcon, ListItemText,Icon } from '@mui/material'
import { useProductos } from './ProductosProvider';
import useGoto from '../../../../Hooks/useGoto';


export default function MoreMenu({rowData}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const {borrarRegistro,getStock,dialogs,setDialogs} = useProductos();
  const navigate = useGoto();
  const id = rowData.id_producto;
  const close = () => {setIsOpen(false);}
  const openStock = ()=>{ setDialogs({...dialogs,stock:true}); getStock(rowData); close(); }
  const openDetails = ()=>{ setDialogs({...dialogs,details:true}); }
  //onClick={()=> {Funciones.goto(`productos/bc?code=${rowData.codigo_producto}`)}} onClick={()=> {openPhoto(rowData)}}
  return (
    <>
      <Fab size='small' ref={ref} onClick={() => setIsOpen(true)}>
        <Icon color="info">more_horiz</Icon>
      </Fab>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={close}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={()=>{ openStock(rowData)}}>
          <ListItemIcon><Icon color="success">inventory</Icon></ListItemIcon>
          <ListItemText primary="Stock" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={()=> { openDetails()}}  sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
          <Icon color="primary">info</Icon>
          </ListItemIcon>
          <ListItemText primary="Detalles" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={()=> navigate.to(`productos/edit/${id}`)}  sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
          <Icon color="primary">mode_edit</Icon>
          </ListItemIcon>
          <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={()=> {navigate.to(`productos/bc?code=${rowData.codigo_producto}`)}}  sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
          <Icon color="secondary">qr_code</Icon>
          </ListItemIcon>
          <ListItemText primary="Código de barras" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={()=>{borrarRegistro(id,rowData.nombre_producto)}} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
          <Icon color="error">delete_sweep</Icon>
          </ListItemIcon>
          <ListItemText primary="Borrar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
